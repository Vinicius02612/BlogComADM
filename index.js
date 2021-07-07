// const bodyParser = require('body-parser');
const express = require('express');
const app = express()
const connection = require('./database/database')

const ModelArticles = require('./articles/modelArticles')
const ModelCategory = require('./categories/modelCategories')

const categories = require('./categories/categoriesControl')
const Articles = require('./articles/articlesControl');




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



app.use("/",Articles)
app.use("/",categories)

app.get("/", (req, res)=>{
  ModelArticles.findAll({
    order:[
      ['id', 'DESC']
    ]
  }).then(articles =>{
    ModelCategory.findAll().then(categories =>{
      res.render("index", {articles:articles, categories:categories})
    })
   
  })
})

app.get("/:slug", (req, res)=>{
  var slug =req.params.slug
  ModelArticles.findOne({
    where:{
      slug:slug
    }
  }).then(article =>{
    if(article != undefined){
      ModelCategory.findAll().then(categories =>{
        res.render("article", {article:article, categories:categories})
      })
      
    }else{
      res.redirect("/")
    }
  })
})

app.get("/category/:slug", (req, res) =>{
   var slug = req.params.slug
   ModelCategory.findOne({
     where:{
       slug:slug
     },
     include:[{model:ModelArticles}]
   }).then( category => { 
        if(category != undefined){
          ModelCategory.findAll().then(categories =>{
            res.render("index", {articles: category.articles, categories:categories})
          })
        }else{

        }
   })
})



app.listen(3030,()=>{
  console.log("servidor executando...");
})