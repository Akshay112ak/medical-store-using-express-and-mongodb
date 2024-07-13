var express=require('express')
var router=express.Router()
var User=require('../model/usersignup')
var {isAuthenticated} = require('./customvalidators')
router.get('/home/:id',isAuthenticated,function(req,res)
{
    const _id=req.params.id
    console.log(_id)
    User.findOne({_id}).then((data1) =>
        {

          console.log(data1,"ndnd",)
          var firstname1=data1.firstname
          var lastname2=data1.lastname
          var data=data1
          console.log("back",firstname1,lastname2,firstname1 + lastname2)
          res.render('home',{data});
        })
        .catch((err) =>
          {
             console.log(err.value,"rere")
          })
})
module.exports=router