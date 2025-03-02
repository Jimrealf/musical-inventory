const express = require('express');
const app = express();
const methodOverride = require('method-override');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware for PUT/DELETE requests
app.use(methodOverride('_method'));

// Serve static files (like CSS) from 'public' folder
app.use(express.static('public'));

// Routes
app.use('/categories', categoryRoutes);
app.use('/items', itemRoutes);

// Home route
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
