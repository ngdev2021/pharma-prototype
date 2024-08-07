# Pharma-Prototype

Pharma-Prototype is a web application designed for managing pharmaceutical inventory, users, orders, suppliers, and FDA data. This documentation provides instructions for setting up, running, and testing the application.

## Table of Contents

- [Setup](#setup)
- [API Documentation](#api-documentation)
  - [Users](#users)
  - [Inventory](#inventory)
  - [Orders](#orders)
  - [Suppliers](#suppliers)
  - [FDA Data](#fda-data)
- [Running Tests](#running-tests)
- [Contribution](#contribution)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ngdev2021/pharma-prototype.git
   cd pharma-prototype
   Install dependencies:
   ```

bash
Copy code
npm install
Set up the environment variables:
Copy the .env.example file to .env and configure your environment variables.

bash
Copy code
cp .env.example .env
Run the application:

bash
Copy code
npm start
API Documentation
Users
Create User
URL: /api/users
Method: POST
Body:
json
Copy code
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"role": "user"
}
Response:
json
Copy code
{
"name": "John Doe",
"email": "john@example.com",
"role": "user",
"\_id": "66b34a85bbd9f515984249eb"
}
Inventory
Create Inventory Item
URL: /api/inventory
Method: POST
Body:
json
Copy code
{
"itemName": "Paracetamol",
"quantity": 100,
"expirationDate": "2024-12-31"
}
Response:
json
Copy code
{
"itemName": "Paracetamol",
"quantity": 100,
"expirationDate": "2024-12-31T00:00:00.000Z",
"\_id": "66b34a85bbd9f515984249ed"
}
Orders
Create Order
URL: /api/orders
Method: POST
Body:
json
Copy code
{
"userId": "66b34a85bbd9f515984249eb",
"items": [
{
"itemId": "66b34a85bbd9f515984249ed",
"quantity": 10
}
],
"status": "Pending"
}
Response:
json
Copy code
{
"userId": "66b34a85bbd9f515984249eb",
"items": [
{
"itemId": "66b34a85bbd9f515984249ed",
"quantity": 10
}
],
"status": "Pending",
"\_id": "66b34a85bbd9f515984249ef"
}
Suppliers
Create Supplier
URL: /api/suppliers
Method: POST
Body:
json
Copy code
{
"name": "Supplier Inc.",
"contactInfo": "contact@supplier.com",
"itemsSupplied": [
{
"itemId": "66b34a85bbd9f515984249ed"
}
]
}
Response:
json
Copy code
{
"name": "Supplier Inc.",
"contactInfo": "contact@supplier.com",
"itemsSupplied": [
{
"itemId": "66b34a85bbd9f515984249ed"
}
],
"\_id": "66b34a85bbd9f515984249f1"
}
FDA Data
Create FDA Data
URL: /api/fda
Method: POST
Body:
json
Copy code
{
"drugName": "Ibuprofen",
"shortageStatus": "Available",
"details": "No shortage"
}
Response:

{
"drugName": "Ibuprofen",
"shortageStatus": "Available",
"details": "No shortage",
"\_id": "66b34a86bbd9f515984249f3"
}
Running Tests
To run the tests, execute the following command:

./test_api_commands.sh
Contribution
Contributions are welcome! Please submit a pull request or open an issue.

### Push Documentation Update

```bash
# Add all changes to the staging area
git add .

# Commit the changes with a message
git commit -m "Updated README.md with setup and API documentation"

# Push the changes to the main branch
git push origin main
```
