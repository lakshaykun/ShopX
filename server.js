// requiring necessary modules
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const db = require('./config/mongooseConnection');
const expressSession = require('express-session');
const flash = require('connect-flash');


const app = express();
const PORT = process.env.PORT || 3000;

// setting up the view engine and middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(flash());

// routes to be used in the application
app.use("/", require('./routes/indexRouter'));
app.use('/owners', require('./routes/ownersRouter'));
app.use('/products', require('./routes/productsRouter'));
app.use('/users', require('./routes/usersRouter'));

// starting the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});   