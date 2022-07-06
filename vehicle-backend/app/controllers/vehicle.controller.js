const db = require("../models");
const Vehicle = db.vehicles;
const Op = db.Sequelize.Op;

// Cria e salva um novo veiculo
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "O conteúdo não pode ficar vazio!",
    });
    return;
  }
  const vehicle = {
    name: req.body.name,
    description: req.body.description,
    plate: req.body.plate,
    isFavorite: req.body.isFavorite ? req.body.isFavorite : false,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price,
  };
  Vehicle.create(vehicle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao criar o Veiculo.",
      });
    });
};

// Recupera todos os veiculos do banco de dados (com condição).
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Vehicle.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu algum erro ao recuperar os veiculos.",
      });
    });
};

// Encontra um único veiculo com um id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Vehicle.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Veiculo não encontrado com id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao recuperar o veiculo com id=" + id,
      });
    });
};

// Atualiza um veiculo identificado pelo id na requisição
exports.update = (req, res) => {
  const id = req.params.id;
  Vehicle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "O veiculo foi atualizado com sucesso.",
        });
      } else {
        res.send({
          message: `Não é possível atualizar o veiculo com id=${id}. Talvez Veiculo não foi encontrado ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao atualizar o veiculo com id=" + id,
      });
    });
};

// Excluir um veiculo com o id especificado na solicitação
exports.delete = (req, res) => {
  const id = req.params.id;
  Vehicle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "O veiculo foi excluído com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível excluir o veiculo com id=${id}. Talvez o Veiculo não tenha sido encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não foi possível excluir o veiculo com id=" + id,
      });
    });
};

// Excluir todos os veiculos do banco de dados.
exports.deleteAll = (req, res) => {
  Vehicle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Veiculos foram excluídos com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum erro ao remover todos os veiculos.",
      });
    });
};
