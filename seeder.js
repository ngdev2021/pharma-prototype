const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/user');
const Inventory = require('./models/inventory');
const Order = require('./models/order');
const Supplier = require('./models/supplier');
const FdaData = require('./models/fdaData');

const MONGODB_URI =
  'mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/pharma-prototype?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Function to seed users
const seedUsers = async () => {
  await User.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const user = new User({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'user',
    });
    await user.save();
  }
};

// Function to seed inventory
const seedInventory = async () => {
  await Inventory.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const inventoryItem = new Inventory({
      itemName: faker.commerce.productName(),
      quantity: faker.datatype.number({ min: 1, max: 100 }),
      expirationDate: faker.date.future(),
    });
    await inventoryItem.save();
  }
};

// Function to seed orders
const seedOrders = async () => {
  await Order.deleteMany({});
  const users = await User.find({});
  const inventory = await Inventory.find({});
  for (let i = 0; i < 20; i++) {
    const order = new Order({
      userId:
        users[
          faker.datatype.number({ min: 0, max: users.length - 1 })
        ]._id,
      items: [
        {
          itemId:
            inventory[
              faker.datatype.number({
                min: 0,
                max: inventory.length - 1,
              })
            ]._id,
          quantity: faker.datatype.number({ min: 1, max: 5 }),
        },
      ],
      status: 'Pending',
    });
    await order.save();
  }
};

// Function to seed suppliers
const seedSuppliers = async () => {
  await Supplier.deleteMany({});
  const inventory = await Inventory.find({});
  for (let i = 0; i < 20; i++) {
    const supplier = new Supplier({
      name: faker.company.name(),
      contactInfo: faker.phone.number(),
      itemsSupplied: [
        {
          itemId:
            inventory[
              faker.datatype.number({
                min: 0,
                max: inventory.length - 1,
              })
            ]._id,
        },
      ],
    });
    await supplier.save();
  }
};

// Function to seed FDA data
const seedFdaData = async () => {
  await FdaData.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const fdaData = new FdaData({
      drugName: faker.commerce.productName(),
      shortageStatus: faker.helpers.arrayElement([
        'Available',
        'Shortage',
      ]),
      details: faker.lorem.sentence(),
    });
    await fdaData.save();
  }
};

// Run all seed functions
const seedAll = async () => {
  await seedUsers();
  await seedInventory();
  await seedOrders();
  await seedSuppliers();
  await seedFdaData();
  mongoose.connection.close();
};

seedAll();
