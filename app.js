// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);

// Sync the model with the database
sequelize.sync();

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));
  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});