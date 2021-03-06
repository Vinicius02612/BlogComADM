const express = require('express')
const slugify = require('slugify')

const articles = require('./modelArticles')
const Category = require('../categories/modelCategories')
const Authenticate = require('../middlewares/adminAuth')

const router = express.Router()


router.get("/admin/articles",Authenticate, (req, res)=>{
  articles.findAll({include:[{model:Category}]
  }).then(articles=>{
    res.render("admin/articles/index", {articles:articles})  
  })
})

//salavando articles..
router.post("/articles/save", (req, res)=>{
  var title = req.body.title
  var body = req.body.body
  var Categoryid = req.body.category

  articles.create({
    title:title,
    slug: slugify(title),
    body:body,
    categoryId: Categoryid
  }).then(()=>[
    res.redirect("/admin/articles")
  ])

})

//rota para edição de artigos
router.get("/admin/articles/edit/:id",Authenticate, (req, res) =>{
  var id = req.params.id

  //se o id for invalido volta para pagina de artigos
  if(isNaN(id)){
    res.redirect("admin/articles")
  }

  articles.findByPk(id).then(articles =>{
    if(articles!= undefined){

      Category.findAll().then(categories =>{
        res.render("admin/articles/edit", {categories:categories, articles:articles})
      })

    }else{
      res.redirect("admin/articles")
    }
  })
})

//persistindo atualizaçã de artigos no banco de dados
router.post("/articles/update",Authenticate,(req, res) =>{
  var id  = req.body.id
  var title = req.body.title
  var body = req.body.body
  var category = req.body.category

  articles.update({
    title:title,
    body:body,
    categoryId:category,
    slug:slugify(title)
  },{
    where:{
      id:id
    }
  }).then(()=>{
    res.redirect("/admin/articles")
  }).catch( err =>{
    res.redirect("/")
  })
})

//deletando artigos..
router.post("/articles/delete",Authenticate,(req, res)=>{
  var id  = req.body.id
  if(id!=undefined){
    if(!isNaN(id)){
      articles.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.redirect("/admin/articles")
      })
    }else{
        res.redirect("/admin/articles")
    }
  }else{
    res.redirect("/admin/articles")
  }
})



// rotas para cadastrar novos artigos
router.get("/admin/articles/new", Authenticate,(req, res)=>{
  Category.findAll().then(categories =>{
    res.render("admin/articles/new", {categories:categories})
  })
})

//https://www.tiny.cloud/get-tiny/self-hosted/
module.exports = router