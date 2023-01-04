const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('geo', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
})

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to db')
  } catch (e) {
    console.log(e)
  }
}

connectDb()

const Place = require('./place')(sequelize)

sequelize.sync({ alter: true })

const db = {
  sequelize,
  Place
}

module.exports = db