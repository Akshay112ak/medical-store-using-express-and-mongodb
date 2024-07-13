var express = require('express');
var router = express.Router();
var {isAuthenticated} = require('./customvalidators')
/* GET home page. */
router.get('/home', isAuthenticated,function(req, res, next) {
  res.render('home',{data:[]});
});

module.exports = router;
