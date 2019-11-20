const mongoose = require('mongoose');

function startDb() {
  mongoose.connect('mongodb://localhost:27017/quizz', {
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

