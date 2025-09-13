require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const connectDb = require('./config/database');

const app = express();

// Database connection
connectDb();

// Templates and views
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', 'layouts/layout');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

// Error page
app.use((req, res) => res.status(404).render("404"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));