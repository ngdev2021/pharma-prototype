Overview
This project is a dashboard application for managing various aspects of a pharmaceutical business, including orders, inventory, suppliers, FDA data, and users. The dashboard is built using React for the frontend and Node.js with Express for the backend. The data is stored in a MongoDB database.

Features
Order Management: View and manage customer orders.
Inventory Management: Track and update inventory items.
Supplier Management: Manage supplier information and items supplied.
FDA Data Management: Fetch and display FDA drug data.
User Management: Manage user information and roles.
Technologies Used
Frontend: React, Axios
Backend: Node.js, Express.js
Database: MongoDB
Styling: CSS, Bootstrap
Authentication: JWT (JSON Web Tokens)
Setup Instructions
Prerequisites
Node.js
npm (Node Package Manager)
MongoDB
Installation
Clone the repository:

git clone https://github.com/your-username/pharma-prototype.git
cd pharma-prototype
Install backend dependencies:


cd pharma-prototype
npm install
Install frontend dependencies:


cd pharma-dashboard
npm install
Set up environment variables:

Create a .env file in the root of the project.
Add the following environment variables:
env

MONGODB_URI=mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/pharma-prototype?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=5000
Run the backend server:


npm start
Run the frontend server:


cd pharma-dashboard
npm start
API Endpoints
Orders: /api/orders
Inventory: /api/inventory
Suppliers: /api/suppliers
FDA Data: /api/fda-data
Users: /api/users
Components
OrderManagement: Displays and manages orders.
InventoryManagement: Displays and manages inventory items.
SupplierManagement: Displays and manages supplier information.
FDADataManagement: Displays and manages FDA data.
UserManagement: Displays and manages users.
Usage
Navigate to the dashboard:
Open http://localhost:3000 in your browser.

Interact with the components:
Use the navigation bar to switch between different management views.

Contributing
Fork the repository.
Create your feature branch: git checkout -b feature-name
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature-name
Open a pull request.
License
This project is licensed under the MIT License.

Contact
For any inquiries, please contact Reginald Brown.