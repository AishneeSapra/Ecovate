const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Cart = require('../models/cart');
const { isLoggedIn } = require('../middleware');
const UserPoints = require('../models/Points'); 


router.get('/shop',async(req,res)=>{
    const products = await Product.find({});
    res.render('Pages/Shop', { products });
})

// Route to add product to cart
router.post('/shop',isLoggedIn, async (req, res) => {
   
           const { productId } = req.body;
           const product = await Product.findById(productId);
           
           
       // Retrieve user ID from the authenticated user's session
        const userId = req.user._id;
        
        // Find the user's cart or create a new cart if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPoints: 0 });
        }

        // Add the product to the cart
        cart.items.push({ productId, points: product.points });
        cart.totalPoints += product.points;
        await cart.save();

        // Flash success message and redirect back to the shop page
        req.flash('success', `${product.name} added to cart`);
        res.redirect('/shop');
});

// Route to display cart
router.get('/cart', isLoggedIn, async (req, res) => {
    const userId = req.user._id; // Directly access req.user._id
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.render('Pages/cart', { cart });
});

// Route to handle checkout


router.post('/checkout', isLoggedIn, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart || cart.items.length === 0) {
        req.flash('error', 'Your cart is empty.');
        return res.redirect('/cart');
    }

    const userPoints = await UserPoints.findOne({ username: req.user.username });

    if (!userPoints || userPoints.totalPoints < cart.totalPoints) {
        req.flash('error', 'You do not have enough points to complete the checkout.');
        return res.redirect('/cart');
    }

    // Deduct points
    userPoints.totalPoints -= cart.totalPoints;
    await userPoints.save();

    // Clear the cart
    cart.items = [];
    cart.totalPoints = 0;
    await cart.save();

    req.flash('success', 'Checkout successful! Your cart has been cleared.');
    res.redirect('/cart');
});


module.exports = router;
