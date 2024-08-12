const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const Buyer = require('./models/buyer');
const User = require('./models/user');
const Inventory = require('./models/inventory');
const Order = require('./models/order');
const Supplier = require('./models/supplier');
const Review = require('./models/review');
const FdaData = require('./models/fdaData');
const DrugShortage = require('./models/DrugShortage.js');
const fs = require('fs');
const drugShortageData = require('./drugShortage.json');
const MONGODB_URI =
  'mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/pharma-prototype?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Function to seed users
const seedUsers = async () => {
  await User.deleteMany({});
  const users = [];
  const userCredentials = [];
  for (let i = 0; i < 20; i++) {
    const plainPassword = faker.internet.password();
    const password = await bcrypt.hash(plainPassword, 10);
    const user = new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      role: 'user',
    });
    users.push(user);
    userCredentials.push({
      name: user.name,
      email: user.email,
      password: plainPassword,
    });
    await user.save();
  }
  // Save the user details with plain passwords to a file for testing purposes
  require('fs').writeFileSync(
    'userCredentials.json',
    JSON.stringify(userCredentials, null, 2)
  );
};

// Function to seed suppliers from JSON data
const seedInventory = async () => {
  await Inventory.deleteMany({});
  const suppliers = await Supplier.find({});
  for (let item of drugShortageData) {
    const supplier = suppliers.find(
      (sup) => sup.name === item['Company Name']
    );
    const inventoryItem = new Inventory({
      itemName: item['Generic Name'],
      drugName: item['Generic Name'],
      supplier: supplier ? supplier.name : null,
      quantity: faker.number.int({ min: 1, max: 100 }),
      expirationDate: faker.date.future(),
      price: faker.commerce.price({
        min: 10,
        max: 200,
        dec: 2,
        symbol: '$',
      }),
      description: item['Therapeutic Category'],
    });
    await inventoryItem.save();
  }
  console.log('Inventory seeded');
};

const seedOrders = async () => {
  await Order.deleteMany({});
  const users = await User.find({});
  const buyers = await Buyer.find({});
  const inventory = await Inventory.find({});
  for (let i = 0; i < 20; i++) {
    const order = new Order({
      userId:
        users[faker.number.int({ min: 0, max: users.length - 1 })]
          ._id,
      buyer:
        buyers[faker.number.int({ min: 0, max: buyers.length - 1 })]
          .name,

      items: [
        {
          itemId:
            inventory[
              faker.number.int({ min: 0, max: inventory.length - 1 })
            ]._id,
          supplier:
            inventory[
              faker.number.int({ min: 0, max: inventory.length - 1 })
            ].supplier,
          // get item name from inventory
          drugName:
            inventory[
              faker.number.int({ min: 0, max: inventory.length - 1 })
            ].drugName,
          quantity: faker.number.int({ min: 1, max: 5 }),
        },
      ],
      status: faker.helpers.arrayElement([
        'Pending',
        'Completed',
        'Cancelled',
      ]),
      orderDate: faker.date.past(),
      totalAmount: faker.commerce.price({
        min: 100,
        max: 1000,
        dec: 2,
        symbol: '$',
      }),
    });
    await order.save();
  }
  console.log('Orders seeded');
};

const seedSuppliers = async () => {
  await Supplier.deleteMany({});
  const companyNames = [
    ...new Set(drugShortageData.map((item) => item['Company Name'])),
  ];
  for (let companyName of companyNames) {
    const supplier = new Supplier({
      name: companyName,
      contactInfo: faker.phone.number(),
      address: faker.location.streetAddress(),
      status: faker.helpers.arrayElement([
        'Active',
        'Inactive',
        'Pending',
      ]),
    });
    await supplier.save();
  }
  console.log('Suppliers seeded');
};
// Function to seed reviews
const seedReviews = async () => {
  const defaultAvatar =
    'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?size=626&ext=jpg';
  try {
    // Clear existing reviews
    await Review.deleteMany({});
    console.log('All existing reviews deleted');

    const users = await User.find({});
    const reviews = [];

    users.forEach((user) => {
      const review = new Review({
        userId: user._id,
        userInitials: user.name
          .split(' ')
          .map((n) => n[0])
          .join(''),
        userName: user.name,
        title: 'Great Product!',
        productId: new mongoose.Types.ObjectId(), // Add a valid product ID
        rating: Math.floor(Math.random() * 5) + 1,
        comment: 'This product really exceeded my expectations!',
        avatar: user.avatar || defaultAvatar, // Use user's avatar or default
      });
      reviews.push(review);
    });

    await Review.insertMany(reviews);
    console.log('New reviews seeded successfully');
  } catch (err) {
    console.error('Error seeding reviews:', err);
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
      details: faker.lorem.paragraph(),
      approvalDate: faker.date.past(),
    });
    await fdaData.save();
  }
};

const seedDrugShortages = async () => {
  const rawDrugShortages = JSON.parse(
    fs.readFileSync('./drugShortage.json', 'utf8')
  );

  const sanitizedDrugShortages = rawDrugShortages.map((drug) => ({
    generic_name: drug['generic_name'] || drug['Generic Name'] || '',
    company_name: drug['company_name'] || drug['Company Name'] || '',
    contact_info:
      drug['contact_info'] || drug['Contact Information'] || '',
    presentation: drug['presentation'] || drug['Presentation'] || '',
    type_of_update:
      drug['type_of_update'] || drug['Type of Update'] || '',
    date_of_update:
      parseDate(drug['date_of_update'] || drug['Date of Update']) ||
      new Date(),
    availability_info:
      drug['availability_info'] ||
      drug['Availability Information'] ||
      '',
    related_info:
      drug['related_info'] || drug['Related Information'] || '',
    resolved_note: drug['resolved_note'] || drug['Note'] || '',
    reason_for_shortage:
      drug['reason_for_shortage'] ||
      drug['Reason for Shortage'] ||
      '',
    therapeutic_category:
      drug['therapeutic_category'] ||
      drug['Therapeutic Category'] ||
      '',
    status: drug['status'] || drug['Status'] || '',
    change_date:
      parseDate(drug['change_date'] || drug['Change Date']) ||
      new Date(),
    date_discontinued:
      parseDate(
        drug['date_discontinued'] || drug['Date Discontinued']
      ) || null,
    initial_posting_date:
      parseDate(
        drug['initial_posting_date'] || drug['Initial Posting Date']
      ) || new Date(),
  }));

  await DrugShortage.deleteMany({});
  await DrugShortage.insertMany(sanitizedDrugShortages);
  console.log('Drug shortages seeded');
};

const seedBuyers = async () => {
  await Buyer.deleteMany({});
  const inventory = await Inventory.find({});
  const buyerTypes = [
    'Hospital',
    'Doctor',
    'Clinic',
    'Government Entity',
  ];
  for (let i = 0; i < 20; i++) {
    const buyer = new Buyer({
      name: faker.company.name(),
      type: faker.helpers.arrayElement(buyerTypes),
      contactInfo: faker.phone.number(),
      address: faker.location.streetAddress(),
      drugsNeeded: [
        inventory[
          faker.number.int({ min: 0, max: inventory.length - 1 })
        ]._id,
      ],
    });
    await buyer.save();
  }
  console.log('Buyers seeded');
};

// Run all seed functions
const seedAll = async () => {
  try {
    // const buyers = await seedBuyers();
    // console.log('Buyers seeded', buyers);

    // const suppliers = await seedSuppliers();
    // console.log('Suppliers seeded');

    // await seedInventory();
    // console.log('Inventory seeded');

    // await seedOrders();
    // console.log('Orders seeded');

    // await seedUsers();
    // console.log('Users seeded');

    // await seedFdaData();
    // console.log('FDA data seeded

    // await seedDrugShortages();
    // console.log('Drug shortages seeded

    await seedReviews();
    console.log('Reviews seeded');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
  mongoose.connection.close();
};

seedAll();
