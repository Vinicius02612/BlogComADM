const express = require('express')
const slugify = require('slugify')
const articles = require('../articles/modelArticles')
const router = express.Router()
// rotas de artigos
router.get("/admin/articles/articles", (req, res)=>{
  res.render("admin/articles/articles")
})


router.post("/articles/save", (req, res)=>{

  var body = req.body.body
  if(body!= undefined){
    articles.create({
      body:body,
      slug:slugify(body)
    }).then(()=>{
      res.redirect("/")
    })
  }else{
    // se o usuário cadastrar volta ao a pagina de ...
    res.redirect("/admin/articles/articles")
  }
})

module.exports = router