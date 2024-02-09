const mongoose = require('mongoose');
require("dotenv").config();

// Options should not be needed with mongoose v7^
mongoose.connect(/*process.env.MONGODB_URI ||*/ 'mongodb://localhost/earlyAccessAudit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
});

module.exports = mongoose.connection;