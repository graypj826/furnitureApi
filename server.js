const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');
const session           = require('express-session');
const methodOverride    = require('method-override');
const stripe = require("stripe")("sk_test_TwTTlid3GeOG6YPydOjARw4I");

const port = process.env.PORT || 9000

// Requrie db
require('./db/db');

// Set view engine for upload test
app.set('view engine', 'ejs');

// Use session
app.use(session({
    secret: 'shop small',
    resave: false,
    saveUninitialized: false,
}));

// Set up middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(methodOverride('_method'));

// Require contorllers after the middleware
const itemController    = require('./controllers/itemController');
const authController    = require('./controllers/authController');
const uploadController  = require('./controllers/uploadController');
const checkoutController= require('./controllers/checkoutController');
const stripeController  = require('./controllers/stripeController');

app.use('/api/v1/items', itemController);
app.use('/auth/login', authController);
app.use('/', uploadController);
app.use('/checkout', checkoutController);
app.use('/charge', stripeController);

app.listen(port);
console.log('---------------------------------');
console.log('Server running on port: ' + port);
console.log('---------------------------------');