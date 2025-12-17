const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const app = express();

/* ================================
   MIDDLEWARES
================================ */
app.use(cors());
app.use(bodyParser.json());

/* ================================
   ROTA RAIZ
================================ */
app.get("/", (req, res) => {
  res.send("API do Almoxarifado rodando!");
});

/* ================================
   TESTE DB
================================ */
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

/* ================================
   LOGIN
================================ */
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = `
    SELECT id_usuario, nome, tipo_usuario
    FROM usuarios
    WHERE email = ? AND senha = ?
  `;

  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (result.length === 0) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    res.json({
  id_usuario: result[0].id_usuario,
  nome: result[0].nome,
  tipo_usuario: result[0].tipo_usuario // agora a chave bate com o Angular
});

  });
});

/* ================================
   CADASTRAR USUÁRIO
================================ */
app.post("/usuarios", (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  const sql = `
    INSERT INTO usuarios (nome, email, senha, tipo_usuario)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nome, email, senha, tipo], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Usuário cadastrado com sucesso" });
  });
});

/* ================================
   LISTAR ITENS
================================ */
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

/* ================================
   BUSCAR ITEM POR ID
================================ */
app.get("/itens/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM itens WHERE id_item = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (result.length === 0) {
        return res.status(404).json({ erro: "Item não encontrado" });
      }
      res.json(result[0]);
    }
  );
});

/* ================================
   CADASTRAR ITEM (FUNCIONÁRIO)
================================ */
app.post("/itens", (req, res) => {
  console.log("📦 BODY RECEBIDO:", req.body);

  const {
    nome_item,
    descricao,
    modelo,
    tombamento,
    quantidade,
    status,
    data_cadastro
  } = req.body;

  const sql = `
    INSERT INTO itens
    (nome_item, descricao, modelo, tombamento, quantidade, status, data_cadastro)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome_item,
      descricao,
      modelo,
      tombamento,
      quantidade,
      status,
      data_cadastro
    ],
    (err, result) => {
      if (err) {
        console.error("❌ ERRO AO CADASTRAR ITEM:", err);
        return res.status(500).json({ erro: err.message });
      }

      res.status(201).json({
        mensagem: "Item cadastrado com sucesso",
        id_item: result.insertId
      });
    }
  );
});

/* ================================
   SOLICITAR RESERVA (COMUNIDADE)
================================ */
app.post("/reservas", (req, res) => {
  const { id_item, id_usuario } = req.body;

  if (!id_item || !id_usuario) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const sql = `
    INSERT INTO reservas
      (id_item, id_usuario, quantidade, status, data_reserva)
    VALUES (?, ?, 1, 'pendente', NOW())
  `;

  db.query(sql, [id_item, id_usuario], (err, result) => {
    if (err) {
      console.error("❌ Erro ao inserir reserva:", err);
      return res.status(500).json({ erro: err.message });
    }

    res.json({
      mensagem: "Reserva solicitada com sucesso",
      id_reserva: result.insertId
    });
  });
});

/* ================================
   LISTAR RESERVAS DO USUÁRIO
   (COMUNIDADE)
================================ */
app.get("/reservas/usuario/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;

  const sql = `
    SELECT
      r.id_reserva,
      r.id_item,
      i.nome_item,
      r.quantidade,
      r.status,
      r.data_reserva
    FROM reservas r
    JOIN itens i ON r.id_item = i.id_item
    WHERE r.id_usuario = ?
    ORDER BY r.data_reserva DESC
  `;

  db.query(sql, [idUsuario], (err, results) => {
    if (err) {
      console.error("❌ ERRO SQL reservas usuário:", err);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

/* ================================
   LISTAR TODAS AS RESERVAS
   (FUNCIONÁRIO)
================================ */
app.get("/reservas", (req, res) => {
  const sql = `
    SELECT
      r.id_reserva,
      r.id_item,
      i.nome_item,
      r.id_usuario,
      u.nome AS nome_usuario,
      r.quantidade,
      r.status,
      r.data_reserva
    FROM reservas r
    JOIN itens i ON r.id_item = i.id_item
    JOIN usuarios u ON r.id_usuario = u.id_usuario
    ORDER BY r.data_reserva DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

/* ================================
   ATUALIZAR STATUS
   (FUNCIONÁRIO)
================================ */
app.put("/reservas/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["aprovado", "negado"].includes(status)) {
    return res.status(400).json({ erro: "Status inválido" });
  }

  const sql = `
    UPDATE reservas
    SET status = ?
    WHERE id_reserva = ?
  `;

  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "Status atualizado com sucesso" });
  });
});

/* ================================
   INICIAR SERVIDOR
================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
