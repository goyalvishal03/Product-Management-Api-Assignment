
# Product Management API

This is a simple RESTful API for managing a list of products. It allows users to create, read, update, and delete products, as well as search and paginate through the product list.

### Features

- CRUD operations for products
- Pagination for product listing
- Search functionality by product name or category
- PostgreSQL database for data persistence
- Sequelize ORM for database interactions

### Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- PostgreSQL (v12 or later)

## Installation

Clone the repository:
```
git clone https://github.com/goyalvishal03/Product-Management-Api-Assignment.git
```

Install the dependencies:

```
npm install
```

Set up the database:
- Create a PostgreSQL database named product_db
- Update the database configuration in config/database.js with your credentials

Run database migrations:
```
npx sequelize-cli db:migrate
```

## Running the Application
To start the server in development mode:
```
npm run dev
```
The server will start on http://localhost:3000 by default.

### API Endpoints

- POST /products - Create a new product
- GET /products - Get all products (supports pagination and search)
- GET /products/:id - Get a single product by ID
- PUT /products/:id - Update a product
- DELETE /products/:id - Delete a product

## API Documentation

Base URL: http://localhost:3000

### Endpoints

#### Create a product

- URL: /products
- Method: POST
- Body:
```
{
  "name": "string",
  "price": "number",
  "description": "string",
  "category": "string"
}
```
- Success Response: 201 Created
- Error Response: 400 Bad Request

#### Get All Products

- URL: /products
- Method: GET
- URL Params:
  - page=[integer]
  - limit=[integer]
  - search=[string]

- Success Response: 200 OK

#### Get a Single Product

- URL: /products/:id
- Method: GET
- URL Params: id=[integer]
- Success Response: 200 OK
- Error Response: 404 Not Found

#### Update a Product

- URL: /products/:id
- Method: PUT
- URL Params: id=[integer]
- Body:
```
{
  "name": "string",
  "price": "number",
  "description": "string",
  "category": "string"
}
```
- Success Response: 200 OK
- Error Response: 400 Bad Request or 404 Not Found

#### Delete a Product

- URL: /products/:id
- Method: DELETE
- URL Params: id=[integer]
- Success Response: 204 No Content
- Error Response: 404 Not Found

#### Error Handling
All endpoints may return the following error:
- 500 Internal Server Error: If there's an unexpected error on the server side.




