const connection = require('../database/database')
const Sequelize = require('sequelize')
//criando tabela de categoria
const User = connection.define('users', {
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },password:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

// User.sync({force:true})
module.exports = User