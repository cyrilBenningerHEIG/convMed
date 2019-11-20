const mongoose = require('mongoose');

function startDb() {
  mongoose.connect('mongodb://admin:Admin123@ds047958.mlab.com:47958/heroku_vcpp2jlx', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Mongodb successully connected'))
  .catch(err => console.log(err));
}

function closeDb() {
  mongoose.connection.close();
}

module.exports = {
  startDb,
}

