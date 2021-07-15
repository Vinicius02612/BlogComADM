const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const ModelUser = require('./modelUser')
const User = require('./modelUser')

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
      res.redirect("/admin/users/create")
    }
  })

    
  // res.json({email, password})
})

module.exports = router