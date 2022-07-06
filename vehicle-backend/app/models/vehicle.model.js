module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicle", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    plate: {
      type: Sequelize.STRING
    },
    isFavorite: {
      type: Sequelize.BOOLEAN
    },
    year: {
      type: Sequelize.INTEGER
    },
    color: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  });
  return Vehicle;
};