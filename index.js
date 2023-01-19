const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// CONECTION DB
const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "containers-us-west-62.railway.app",
  port: "6166",
  user: "root",
  password: "kuj3kyEJZ1IzGL7Y0gC4",
  database: "railway",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json()); //traz o objeto no formato json

app.get("/numeros", (err, res) => {
  connection.query("SELECT * FROM numeros", function (err, data) {
    if (err) throw err;
    return res.status(200).json(data);
  });
});

app.post("/numeros", (req, res) => {
  const data = req.body;

  connection.query(`INSERT INTO numeros VALUES (?)`, [data], function (err) {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso!");
  });
});

app.listen(process.env.PORT || port, function () {
  console.log(`O servidor está rodando na porta ${port}`);
});
