const express = require('express')
const router = express.Router()
const Category = require('../categories/modelCategories')
const slugify = require('slugify')

router.get("/admin/categories/new", (req, res)=>{
  res.render('admin/categories/new')
})

router.post("/categories/save", (req, res)=>{
  var title = req.body.title
  if(title != undefined){
    Category.create({
      title:title,
      slug:slugify(title)
    }).then(()=>{
      res.redirect("/")
    })
  }else{
    // se o usuário cadastrar um titulo indefinido volta ao a pagina de new...
    res.redirect("/admin/categories/new")
  }
})

//listando categorias no front...
router.get("/admin/categories", (req, res)=>{
  Category.findAll().then(categories =>{
    res.render("admin/categories/index", {categories:categories})  
  })
})

//deletando uma categoria...
router.post("/categories/delete",(req, res)=>{
  var id  = req.body.id
  if(id!=undefined){
    if(!isNaN(id)){
      Category.destroy({
        where:{
          id:id
        }
      }).then(()=>{
        res.redirect("/admin/categories")
      })
    }else{
        res.redirect("/admin/categories")
    }
  }else{
    res.redirect("/admin/categories")
  }
})

module.exports = router