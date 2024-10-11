
## Getting Started

First, run the development server:

```bash
npm start
# or
yarn start

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Project Setup and Documentation

*1. Setup Instructions*
- Install dependencies: Run npm install to install all required packages.
- Configure database connection in your config file.
- Sync the database with your models: Ensure Sequelize syncs the tables.

*2. Running the Server*
- Start the server using npm start or nodemon if installed.

*3. API Endpoints*
- *GET /products*: Retrieve all products.
- *POST /product*: Create a new product (requires name and price in body).
- *GET /products/:id*: Retrieve a product by ID.
- *PUT /products/:id*: Update an existing product by ID (accepts fields in body).
- *DELETE /products/:id*: Delete a product by ID.

*4. Testing API Endpoints*
- Use Postman or cURL to test the API routes and verify responses.