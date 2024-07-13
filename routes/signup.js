var express = require('express');
var {validationResult}=require('express-validator')
var router = express.Router();
var User=require('../model/usersignup')
var { validateEmail, validatePassword,ValidateConfirmpassword }=require('./customvalidators')
var bcrypt=require('bcrypt')
/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup',{errors:[]});
});
router.post('/signupverify',
 [
   validateEmail,
   validatePassword,
   ValidateConfirmpassword,
   ],
function(req,res)
{
  // errors=validationResult(req)
  const errors = req.validationErrors || [];
    // Validate the request
  const validationResultErrors = validationResult(req);
  // console.log(typeof(validationResultErrors),"ariyam",validationResultErrors,"ok",validationResult(req),typeof(validationResult))
  if (!validationResultErrors.isEmpty()) {
      // Merge the errors from validation result into the existing errors
      errors.push(...validationResultErrors.array());
    }
    console.log(errors,"chjj")
    if(errors.length > 0)
      {
        res.render('signup',{errors}
      ) 
      }
      else
      {
        const {firstname,lastname,email,password}=req.body;
        User.findOne({email})
        .then(existuser =>
          {
            if(existuser)
              {
                var errors=[]
                errors.push({msg:"Email already taken"})
                console.log(errors,"show me")
                return res.render('signup',{errors})
              }
              else{
                  console.log("hereee",bcrypt.hashSync(password,10))
                return bcrypt.hash(password,10)
              }
          }).then(hashpassword =>
            {
             
                const newUser = new User({
                  firstname,
                  lastname,
                  email,
                  password:hashpassword
                  });
                   newUser.save()
                  .then(() => {
                  res.render('login',{errors:[]});
                  })
                  .catch((error) => {
                  console.error(error,"saving");
                  });
            })
           
       
      
      }
})

module.exports = router;
