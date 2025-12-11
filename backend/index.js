const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// --------------------------------------------
// ROTA RAIZ
// --------------------------------------------
app.get("/", (req, res) => {
  res.send("API do Almoxarifado rodando!");
});

// --------------------------------------------
// TESTE DB
// --------------------------------------------
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// --------------------------------------------
// LISTAR ITENS
// --------------------------------------------
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// --------------------------------------------
// BUSCAR ITEM POR ID
// --------------------------------------------
app.get("/itens/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM itens WHERE id_item = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err });

    if (result.length === 0)
      return res.status(404).json({ erro: "Item não encontrado" });

    res.json(result[0]);
  });
});

// --------------------------------------------
// SOLICITAR RESERVA
// --------------------------------------------
app.post("/reservas", (req, res) => {
  const { id_item, id_usuario } = req.body;

  if (!id_item || !id_usuario) {
    return res.status(400).json({ erro: "Dados incompletos" });
  }

  const sql = `
    INSERT INTO reservas (id_item, id_usuario, status, data_solicitacao)
    VALUES (?, ?, 'pendente', NOW())
  `;

  db.query(sql, [id_item, id_usuario], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao registrar reserva" });

    res.json({ mensagem: "Reserva solicitada com sucesso!" });
  });
});

// --------------------------------------------
// ALTERAR STATUS DA RESERVA (ADMIN)
// --------------------------------------------
app.put("/reservas/:id/status", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!["aprovado", "negado"].includes(status)) {
    return res.status(400).json({ erro: "Status inválido" });
  }

  const sql = "UPDATE reservas SET status = ? WHERE id_reserva = ?";

  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json({ erro: err });

    res.json({ mensagem: "Status atualizado!" });
  });
});

// --------------------------------------------
// APROVAR RESERVA (ATUALIZA QUANTIDADE)
// --------------------------------------------
app.put("/reservas/:id/aprovar", (req, res) => {
  const id_reserva = req.params.id;

  const sqlBusca = `
    SELECT r.id_item, i.quantidade 
    FROM reservas r
    JOIN itens i ON i.id_item = r.id_item
    WHERE r.id_reserva = ?
  `;

  db.query(sqlBusca, [id_reserva], (err, result) => {
    if (err) return res.status(500).json({ erro: err });

    if (result.length === 0) {
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    const { id_item, quantidade } = result[0];

    if (quantidade <= 0) {
      return res.status(400).json({ erro: "Não há quantidade disponível" });
    }

    const novaQuantidade = quantidade - 1;

    // Atualizar quantidade do item
    const sqlAtualizaItem = `
      UPDATE itens SET quantidade = ? WHERE id_item = ?
    `;

    db.query(sqlAtualizaItem, [novaQuantidade, id_item], (err2) => {
      if (err2) return res.status(500).json({ erro: err2 });

      // Atualizar reserva com status aprovado + quantidade atual
      const sqlAtualizaReserva = `
        UPDATE reservas
        SET status = 'aprovado', quantidade = ?
        WHERE id_reserva = ?
      `;

      db.query(sqlAtualizaReserva, [novaQuantidade, id_reserva], (err3) => {
        if (err3) return res.status(500).json({ erro: err3 });

        res.json({
          mensagem: "Reserva aprovada!",
          quantidade_atual: novaQuantidade,
        });
      });
    });
  });
});

// --------------------------------------------
// INICIAR SERVIDOR
// --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).json({ erro: err });

    if (result.length === 0)
      return res.status(401).json({ erro: "Credenciais inválidas" });

    const usuario = result[0];

    res.json({
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      tipo: usuario.tipo_usuario
    });
  });
});

