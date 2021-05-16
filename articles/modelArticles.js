const Sequelize = require('sequelize')
const connection = require('../database/database')
const categories = require('../categories/modelCategories')

//criando tabela de artigos...
const Article = connection.define('articles', {
  title:{
    type:Sequelize.STRING,
    allowNull:false
  },slug:{
    type:Sequelize.STRING,
    allowNull:false
  },
  body:{
    type:Sequelize.TEXT,
    allowNull:false
  }
})

categories.hasMany(Article)//relacionamento 1 para N 
Article.belongsTo(categories)// criando relacionamento entre as tababelas 1 para 1


// Article.sync({force: true})


module.exports = Article