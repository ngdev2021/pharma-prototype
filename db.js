const mongoose = require('mongoose');

const dbURI =
  'mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/pharma-prototype?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(dbURI, {
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

module.exports = mongoose;
