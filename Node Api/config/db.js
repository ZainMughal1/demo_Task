const { Sequelize } = require('sequelize');

// Initialize Sequelize with AWS RDS PostgreSQL connection details
const sequelize = new Sequelize('postgres', 'postgres', 'casualpostgresql', {
    host: 'nodedb.cpeqqwc4etp8.us-east-1.rds.amazonaws.com', //AWS endpoint
    dialect: 'postgres',
    port: 5432, // Default PostgreSQL port; change if needed
    dialectOptions: {
        ssl: {
            require: true, // If SSL is required
            rejectUnauthorized: false // You might need this option if AWS uses self-signed certificates
        }
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to AWS PostgreSQL has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the AWS PostgreSQL database:', err);
    });

module.exports = sequelize;
