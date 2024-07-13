var express=require('express')
var router=express.Router()
const Product=require('../model/useraddmedicine')
router.get('/Viewproduct/deleteproduct/:id',function(req,res)
{
    const prid=req.params.id
    Product.findByIdAndDelete(prid).then((data1) =>
        {
            console.log(data1,"product1")
            const userid=data1.userid
            res.redirect('/Viewproduct/'+userid)
        })
        .catch((err) =>
        {
          console.log("error back")
         
        });
    
});
module.exports=router