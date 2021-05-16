// const bodyParser = require('body-parser');
const express = require('express');
const app = express()
const connection = require('./database/database')

// const ModelArticles = require('./articles/modelArticles')
// const ModelCategory = require('./categories/modelCategories')

const categories = require('./categories/categoriesControl')
const articles = require('./articles/articlesControl')


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão com banco de dados estabelicida")
    }).catch((error)=>{
         console.log(error)
    })

app.get("/", (req, res)=>{
  res.render("index");
})

app.use("/",articles)
app.use("/",categories)

app.listen(8080,()=>{
  console.log("servidor executando...");
})