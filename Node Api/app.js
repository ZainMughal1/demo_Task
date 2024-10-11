const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes');
const sequelize = require('./config/db');
const Product = require('./models/Product')



const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);
sequelize.sync({ force: false })  // Set to `true` to drop and recreate tables each time
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to Database.')
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing Product table:', err);
    });

