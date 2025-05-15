const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const ownerModel = require('../models/ownerModel');
const { isOwnerLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/', (req, res) => {
    res.status(200).send('Route is working');
})

router.post('/create', isOwnerLoggedIn, async (req, res) => {
    try {
        const { image, name, price, category} = req.body;

        // Check if product already exists
        const product = await productModel.findOne({ name });
        if (product) {
            console.log({ message: 'Product already exists' });
            return res.status(400).send('Product already exists');
        } 

        // Create product
        const newProduct = new productModel({
            image,
            name,
            price,
            category
        });
        const owner = await ownerModel.findById(req.owner._id);
        if (!owner) {
            console.log({ message: 'Owner not found' });
            return res.status(404).send('Owner not found');
        }
        await newProduct.save();
        owner.products.push(newProduct._id);
        await owner.save();

        console.log({ message: 'Product created successfully', product: newProduct });
        return res.status(201).send('Product created successfully');
    } catch (error) {
        console.error({ message: 'Error during product creation', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete', isOwnerLoggedIn, async (req, res) => {
    try {
        const { productId } = req.body;
        const owner = await ownerModel.findById(req.owner._id);
        if (owner.products.findIndex(id => String(id) === productId) === -1) {
            console.log({ message: 'Product not found in owner\'s products' });
            return res.status(404).send('Product not found in owner\'s products');
        }

        // delete the product from the owner
        owner.products = owner.products.filter(product => String(product) !== productId);
        await owner.save();
        
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }

        console.log({ message: 'Product deleted successfully' });
        return res.status(200).send('Product deleted successfully');
    } catch (error) {
        console.error({ message: 'Error deleting product', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
});


router.put('/edit', isOwnerLoggedIn, async (req, res) => {
    try {
        const { productId, image, name, price, discount, description, bgcolor, category, panelcolor, textcolor } = req.body;
        const owner = await ownerModel.findById(req.owner._id);

        // Check if product belongs to owner
        const isOwnerProduct = owner.products.find(id => String(id) === productId);
        if (!isOwnerProduct) {
            console.log({ message: 'Product not found in owner\'s products' });
            return res.status(404).send('Product not found in owner\'s products');
        }

        // Update product
        const updatedProduct = await productModel.findByIdAndUpdate(productId, {
            image,
            name,
            price,
            discount,
            description,
            bgcolor,
            category,
            panelcolor,
            textcolor
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        console.log({ message: 'Product updated successfully', updatedProduct });
        return res.status(200).send('Product updated successfully');

    } catch (error) {
        console.error({ message: 'Error updating product', error: error.message });
        return res.status(500).send('Internal Server Error');
    }
});



module.exports = router;