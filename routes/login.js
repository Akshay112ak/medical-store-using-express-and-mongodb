var express = require('express');
var {validationResult}=require('express-validator')
var router = express.Router();
var User=require('../model/usersignup')
var { validateEmail, validatePassword}=require('./customvalidators')
var bcrypt=require('bcrypt')


/* GET home page. */


router.get('/logout', (req, res)=> {
  req.session.destroy((err) =>
  {
    if(err)
      {
        var errors=[]
        console.log(err);
        res.send("error")
      }else{
        res.render('login',{errors});
      }
  })
 
});

router.get('/', function(req, res, next) {
  res.render('login',{errors:[]});
});
router.post('/loginverify', 
[
  validateEmail,
  validatePassword,
],
function(req, res) {
  const errors = req.validationErrors || [];
const validationResultErrors = validationResult(req);
if (!validationResultErrors.isEmpty()) {
    errors.push(...validationResultErrors.array());
  }
  if(errors.length > 0)
    {
      res.render('login',{errors}
    ) 
    }
  var {email,password}=req.body
  console.log(email,password,"hhh")
  let founduser;
  User.findOne({email}).then((user) => 
  {
    console.log(user,"user")
    if(!user)
      {
        
        const errors=[]
        errors.push({msg:"Incorrect email address"})
        return res.render('login',{errors})
      }
      founduser=user;
      console.log("p",password,user.password)
      console.log("hj",bcrypt.compare(password,user.password))
      return bcrypt.compare(password,user.password)
  })
  .then(isPasswordValid =>
    {
      console.log("passwod checking",isPasswordValid)
      if(!isPasswordValid)
        {
      const errors=[]
      errors.push({msg:"Incorrect password"})
      return res.render('login',{errors})
        }
        
        req.session.userId=founduser._id;
        req.session.userEmail=founduser.email;
        console.log(req.session.userEmail,"req.session")
        console.log(req.session,"req.session")
        var firstname1=founduser.firstname
        var lastname2=founduser.lastname
        console.log(password,"pass")
        res.render('home',{data:founduser});
    })
   
    
    
  // User.findOne({email:email,password:password}).then((data) =>
  // {
  //   // console.log(data,"ndnd")
  //   const email1=req.session.email || null;
  //   console.log("here",email1,"session",req.session)
  //   console.log(data.firstname)
  //   var firstname1=data.firstname
  //   var lastname2=data.lastname
    
  //   console.log("ffh",firstname1,lastname2,firstname1 + lastname2)
  //   res.render('ekart2',{name:firstname1 +" "+ lastname2,data:data,email:email1});
  // })
  // .catch((err) =>
  // {
  //   const errors = [];
  //   console.log("finding err login.js")
  //   errors.push({ msg: 'invalid username and password' });
  //   res.render("login",{errors})
  // });
  console.log(req.session,"req.session")
});




 module.exports = router;
