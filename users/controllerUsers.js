const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const ModelUser = require('./modelUser')



router.get("/admin/users", (req, res) =>{
  ModelUser.findAll().then(users =>{
    res.render("admin/users/index", {users:users})
  })
})



router.get("/admin/users/create", (req, res) =>{
  res.render("admin/users/create")
})

//salvado usuário no banco
router.post("/users/create", (req, res) =>{
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password

  ModelUser.findOne({where:{email:email}}).then(user =>{
    if(user ==undefined){
      
      var salt = bcryptjs.genSaltSync(10);
    
      var hash = bcryptjs.hashSync(password,salt)
    
      ModelUser.create({
        name:name,
        email:email,
        password:hash
      }).then(()=>{
        res.redirect("/admin/users")
      }).catch((err) =>{
        res.redirect("/")
      })

    }else{
      res.redirect("/admin/users")
    }
  })

    
  // res.json({email, password})
})

//acessando rota de login
router.get("/login", (req, res) =>[
  res.render("admin/users/login")
])

//rota para autenticar o usários
router.post("/authenticate", (req, res) =>{
  var email = req.body.email
  var password = req.body.password

  ModelUser.findOne({where:{email:email}}).then(user =>{
    //se exigistir um usuário com email digitado validar senha usando bcrypt
    if(user != undefined){
      var PassWrodCorrect = bcryptjs.compareSync(password, user.password)
      if(PassWrodCorrect){
        req.session.user ={
          id: user.id,
          email: user.email
        }
        // res.json(req.session.user)
        res.redirect("/admin/articles")
      }else{
        res.redirect("/login")
      }
    }else{
      res.redirect("/login")
    }
  })
})

//rota para deslogar/sair da aplicação
router.get("/logout", (req, res) =>{
  req.session.user =undefined;
  res.redirect("/")
})

module.exports = router