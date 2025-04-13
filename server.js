const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/mongooseConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/owners', require('./routes/ownersRouter'));
app.use('/products', require('./routes/productsRouter'));
app.use('/users', require('./routes/usersRouter'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});