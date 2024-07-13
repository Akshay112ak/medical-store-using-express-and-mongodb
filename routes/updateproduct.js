var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');
const Product = require('../model/useraddmedicine');
const User = require('../model/usersignup');
const { ValidateTime } = require('./customvalidators');
var {isAuthenticated} = require('./customvalidators')

router.get('/Viewproduct/updateproduct/:id', isAuthenticated,function(req, res) {
    const productid = req.params.id;
    console.log(productid,"10updateprod_id")
    Product.findById(productid).then((data1) => {
        console.log(data1, "product1");
   res.render('updateproduct', { _id: data1._id,id:data1.userid, data: data1, errors: null,errorss:null });
    }).catch((err) => {
        console.log("error back", err);
    });
});

router.post('/updateproduct/:id', [ValidateTime], async function(req, res) {
    const prid = req.params.id;
    console.log(prid,"21updateprod_id")
    const errors = req.validationErrors || [];
    const validationResultErrors = validationResult(req);

    if (!validationResultErrors.isEmpty()) {
        errors.push(...validationResultErrors.array());
    }

    console.log(errors.length, "ghh");
    if (errors.length > 0) {
        Product.findById(prid).then((data1) => {
            console.log(data1, "product1");
            res.render('updateproduct', { _id: data1._id,id:data1.userid, data: data1, errors,errorss:null });
        }).catch((err) => {
            console.log("error back", err);
        });
        return;
    }

    let userid = "";
    try {
        const product = await Product.findById(prid);
        userid = product.userid;
    } catch (err) {
        console.log("some error", err);
        return res.status(500).send("An error occurred while fetching the product.");
    }

    const addedtime = new Date();
    const { uniqueid, medicinename, company, expirydate, stock,price } = req.body;
    
    try {
        const updatedProduct = {
            uniqueid,
            medicinename,
            price,
            company,
            expirydate,
            addedtime,
            userid,
            stock
        };
        
        const validationError = new Product(updatedProduct).validateSync();
        console.log("product updation error");
        if (validationError) {
            Product.findById(prid).then((data1) => {
                console.log(data1, "product1");
                res.render('updateproduct', { _id: data1._id,id:data1.userid, data: data1, errors: validationError.errors,errorss:null });
            }).catch((err) => {
                console.log("error back", err);
            });
            return;
        }
        
        await Product.findByIdAndUpdate(prid, updatedProduct);
        res.redirect("/Viewproduct/" + userid);
    } catch (err) {
        console.log("error update", err);
        const errorMessages = [];
        if (err.code === 11000 && err.keyPattern && err.keyPattern.uniqueid) {
            errorMessages.push({ msg: "Duplicate uniqueid error: A medicine with this uniqueid already exists." });
        } else if (err.message === 'User can only have up to 5 medicines') {
            errorMessages.push({ msg: "User can only have up to 5 medicines" });
        } else {
            errorMessages.push({ msg: 'An error occurred while adding the medicine' });
        }
        Product.findById(prid).then((data1) => {
            console.log(data1, "product1");
            res.render('updateproduct', { _id: data1._id,id:data1.userid, data: data1, errors: errorMessages,errorss:null });
        }).catch((err) => {
            console.log("error back", err);
        });
        
    }
});

module.exports = router;
