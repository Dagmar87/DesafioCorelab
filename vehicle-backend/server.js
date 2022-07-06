const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado.");
  })
  .catch((err) => {
    console.log("Falha ao sincronizar banco de dados: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao Cadastro de Veiculos." });
});

require("./app/routes/vehicle.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}.`);
});