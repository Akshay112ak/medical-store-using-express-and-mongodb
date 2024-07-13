var express=require('express')
var router=express.Router()
const Product=require('../model/useraddmedicine')
var {isAuthenticated} = require('./customvalidators')
router.get('/Viewproduct/:id',isAuthenticated,function(req,res)
{
    const userid=req.params.id
    const { page = 1, limit = 3 } = req.query;
    console.log(req.query,"ff")
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    Product.paginate({userid:userid}, options)
      .then(result => {
        // console.log("res",result.docs)
        res.render('viewproduct', { data: result.docs, totalPages:result.totalPages,currentPage:result.page,id:userid,limit:options.limit });
      })
        .catch((err) =>
        {
          console.log("error back in view")
        });
    
});
module.exports=router