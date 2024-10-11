const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the Product model
const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

}, {
    // Additional model options
    timestamps: true,  // Adds createdAt and updatedAt fields
});

module.exports = Product;
