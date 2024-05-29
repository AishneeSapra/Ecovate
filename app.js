if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Activity = require('./models/activity');
const Plantation=require('./models/plantation');
const Point=require('./models/Points');
const User = require('./models/user');
const Product = require('./models/products');
const userRoutes = require('./routes/user');
const cartRoutes=require('./routes/cart');
const blogRoutes = require('./routes/blog');
const ExpressError = require('./utils/Expresserror');
const catchAsync = require('./utils/catchAsync');
const ejsMate=require('ejs-mate');
const methodOverride = require('method-override');

const { isLoggedIn } = require('./middleware');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const session=require('express-session');
const flash=require('connect-flash');

const MongoDBStore = require("connect-mongo")(session);



// Connect to MongoDB
//mongoose.connect('mongodb://127.0.0.1:27017/eco-vate') 
//const dbUrl =  process.env.DB_URL ;

const dbUrl = process.env.DB_URL ;
mongoose.connect(dbUrl);
//mongoose.connect('mongodb+srv://second-user:JXwQA4Aa8wpBmXU6@cluster0.he5aacd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



// Set view engine and views path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.engine('ejs',ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))



const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    //console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})








  app.use('/', userRoutes);
  app.use('/', cartRoutes);
  app.use('/', blogRoutes);


// Define route to fetch activities
app.get('/activity', catchAsync(async (req, res) => {
  
        const activities = await Activity.find({});
      
        res.render('Pages/Activity', { activities });
    
}));

app.get('/activity/new',isLoggedIn,catchAsync(async(req,res)=>{
    res.render('Pages/newactivity');
}));

app.post('/activity', async (req, res) => {
    const { name, pincode, plotnumber } = req.body;

    // Check if plantation already exists for the given PinCode and PlotNumber
    const existingPlantation = await Plantation.findOne({ PinCode: pincode, PlotNumber: plotnumber });

    if (existingPlantation) {
        // Plantation already exists, send alert to client
        res.send('<script>alert("Sorry, plantation already exists in that area."); window.location.href = "/activity/new";</script>');
    } else {
        // Plantation doesn't exist, create new plantation
        const newPlantation = new Plantation({ PinCode: pincode, PlotNumber: plotnumber });
        await newPlantation.save();
        // Send response indicating success
        //('<script>alert("Congratulations! You have earned 100 points."); window.location.href = "/activity/new";</script>');
         
        let user = await Point.findOne({ username: name });

        // If user doesn't exist, create a new user
        if (!user) {
            user = new Point({username:name});
        }

        // Add 100 points to totalPoints
        user.totalPoints += 100;

        // Save the updated user data
        await user.save();

        // Redirect to a separate page to display total points
    
        res.redirect(`/points/${user._id}`);
    }
    
});

app.get('/points', async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in to view points.');
        return res.redirect('/login');
    }
    const user = await Point.findOne({ username: req.user.username });
    res.render('Pages/Points', { totalPoints:user.totalPoints});
});

// Route to display total points on a separate page
app.get('/points/:id', catchAsync(async (req, res) => {
    const user = await Point.findById(req.params.id);
    // Render a page to display total points
    res.render('Pages/Points', { totalPoints: user.totalPoints });
}));


app.get('/activity/:id',catchAsync(async(req,res)=>{
    const activity=await Activity.findById(req.params.id);
    res.render('Pages/activityshow',{activity});
}));
app.get('/',async(req,res)=>{
    res.render('Pages/home');
})

app.get('/carbonFootprints',async(req,res)=>{
    res.render('Pages/carbon');
})




app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})




app.listen(3000,()=>{
    console.log('Serving on Port 3000');
});
