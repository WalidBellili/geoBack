const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Place = sequelize.define('Place', {
    name: {
      type: DataTypes.STRING
    },
    horaire: {
        type: DataTypes.STRING
    },
    adresse: {
        type: DataTypes.STRING
    }, 
    arrondissement: {
        type: DataTypes.STRING
    },
    position: {
      type: DataTypes.GEOMETRY
    }
  })

  return Place
}