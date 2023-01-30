const express = require('express'); 
const path = require('path');         
const helmet = require('helmet');    
const rateLimit = require("./middleware/rate-limit");  
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
require('dotenv').config();

// Creation of the express application
const app = express();

// Middleware Header to bypass errors by unblocking certain CORS security systems, so that everyone can make requests from their browser
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

//directly use the express.json method
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '500MB'}));
app.use(helmet());  // use of the 'helmet' module for security by protecting the application from XSS flaws targeting cookies
app.use(rateLimit); //limitation of the number of requests
app.use('/images', express.static(path.join(__dirname, 'images'))); // Middleware to load files that are in the images directory

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;