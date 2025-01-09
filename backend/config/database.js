const mongoose = require('mongoose');
require('dotenv').config();

async function connect(){
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = connect