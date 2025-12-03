const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",      // coloque a sua senha do MySQL
    database: "almoxarifado",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL com sucesso!");
});

module.exports = db;
