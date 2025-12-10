const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const db = require("./config/db"); // conexão correta
const app = express();

app.use(cors());
app.use(bodyParser.json());

// --------------------------------------------
// 🔹 ROTA RAIZ
// --------------------------------------------
app.get("/", (req, res) => {
  res.send("API do Almoxarifado rodando!");
});

// --------------------------------------------
// 🔹 TESTE DO BANCO DE DADOS
// --------------------------------------------
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

// --------------------------------------------
// 🔹 LISTAR TODOS OS ITENS
// --------------------------------------------
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

// --------------------------------------------
// 🔹 BUSCAR ITEM POR ID  (CORRIGIDO)
// --------------------------------------------
app.get('/itens/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM itens WHERE id_item = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        return res.json(result[0]);
    });
});

// --------------------------------------------
// 🔹 INICIAR SERVIDOR
// --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
