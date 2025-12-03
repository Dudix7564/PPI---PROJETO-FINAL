const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "almoxarifado"
});

// Testar a conexão
db.connect(err => {
    if (err) throw err;
    console.log("MySQL conectado!");
});

// Rota simples
app.get("/", (req, res) => {
    res.send("API do Almoxarifado funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
