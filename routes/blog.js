const express = require('express');
const router = express.Router();                                  //
const Blog = require('../models/blog');
const EcoFriendlyWord = require('../models/EcoWords');
const Point = require('../models/Points');
const { isLoggedIn } = require('../middleware');

// Route to display all blogs
router.get('/blog', async (req, res) => {
    const blogs = await Blog.find({}).populate('author');
    res.render('Pages/Blog', { blogs });
});

// Route to display new blog form
router.get('/blog/new', isLoggedIn, (req, res) => {
    res.render('Pages/newblog');
});

// Route to create a new blog
router.post('/blog', isLoggedIn, async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({ title, content, author: req.user._id });

    // Check for eco-friendly words
    const ecoWords = await EcoFriendlyWord.find({});
    const wordsArray = ecoWords.map(wordObj => wordObj.word);
    const contentWords = content.split(' ');

    let pointsAwarded = 0;
    contentWords.forEach(word => {
        if (wordsArray.includes(word.toLowerCase())) {
            pointsAwarded += 10;  // Award 10 points for each eco-friendly word
        }
    });

    let userPoints = await Point.findOne({ username: req.user.username });
    if (!userPoints) {
        userPoints = new Point({ username: req.user.username, totalPoints: 0 });
    }
    userPoints.totalPoints += pointsAwarded;
    await userPoints.save();

    await blog.save();
    req.flash('success', `Blog created! You have earned ${pointsAwarded} points.`);
    res.redirect('/blog');
});

module.exports = router;