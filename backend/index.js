const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const db = require("./config/db"); // nossa conexão
const app = express();

app.use(cors());
app.use(bodyParser.json());

// rota raiz
app.get("/", (req, res) => {
  res.send("API do Almoxarifado rodando!");
});

// rota de teste simples ao DB
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS resultado", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: err.message });
    }
    res.json(results);
  });
});

// rota para listar itens
app.get("/itens", (req, res) => {
  db.query("SELECT * FROM itens", (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
