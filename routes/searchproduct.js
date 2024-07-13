// routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../model/useraddmedicine'); // Ensure this path is correct

router.get('/searchProducts', async (req, res) => {
    const query = req.query.q;
    const userId = req.query.userid;

    console.log(`Received search query: ${query} for user ID: ${userId}`); // Debug log to confirm query reception and user ID
   
    try {
        const products = await Product.find({
            medicinename: { $regex: `^${query}`, $options: 'i' },
            userid: userId  // Ensure the product matches the given user ID
        });
        console.log(`Found products: ${products}`); // Debug log to confirm products retrieval
        res.json(products);
    } catch (error) {
        console.error('Error during product search:', error); // Debug log for errors
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
