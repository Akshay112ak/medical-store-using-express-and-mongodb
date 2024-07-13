const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const Product = require('../model/useraddmedicine');
var {isAuthenticated} = require('./customvalidators')
// const User = require('../model/usersignup');
var data={}
const { ValidateTime } = require('./customvalidators');

router.get('/addproduct/:id',isAuthenticated, function(req, res) {
  const user_id = req.params.id;
  res.render('addproduct', { id: user_id, errors: null ,errorss:null});
 
});

router.post('/productsubmittion/:id', [ValidateTime], async function(req, res) {
  const user_id = req.params.id;
//   User.findById({user_id}).then(data1 =>{
//     data=data1
//     // console.log(data,"here")
// })
  const errors = req.validationErrors || [];
  const validationResultErrors = validationResult(req);

  if (!validationResultErrors.isEmpty()) {
    errors.push(...validationResultErrors.array());
  }

  if (errors.length > 0) {
    return res.render('addproduct', { id: user_id, errors ,errorss:null});
  }
  const userid=req.params.id
  const addedtime1 = new Date();
  const addedtime=addedtime1.toUTCString()
  const { uniqueid, medicinename, company, expirydate, stock,price } = req.body;
  const product = new Product({
    uniqueid,
    price,
    medicinename,
    company,
    expirydate,
    addedtime,
    userid,
    stock
  });

  try {
    await product.save();
   var data={_id:user_id}
    res.render('home', { data});
  } catch (err) {
    console.log(err.errors,"errr")
    console.error(`Error saving product for user ${user_id}: ${err.message}`); // Debug log
    const errorMessages = [];

    if (err.code === 11000 && err.keyPattern && err.keyPattern.uniqueid) {
      errorMessages.push({ msg: "Duplicate uniqueid error: A medicine with this uniqueid already exists." });
    } else if (err.message === 'User can only have up to 5 medicines') {
      errorMessages.push({ msg: "User can only have up to 5 medicines" });
    } else {
      errorMessages.push({ msg: 'An error occurred while adding the medicine' });
    }
     console.log(errorMessages,"62addproduct.js")
    res.render('addproduct', { id: user_id, errors: errorMessages ,errorss:err.errors});
  }
});

module.exports = router;
