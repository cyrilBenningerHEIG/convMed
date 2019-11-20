const mongoose = require('mongoose');

function startDb() {
  mongoose.connect('mongodb://localhost:27017/quizz', {
    useNewUrlParser: true,
    keepAlive: 1
  })
  .then(() => console.log('Mongodb successully connected'));

  return mongoose.connection
    .on('error', console.error)
    .on('disconnected', startDb);
}

function closeDb() {
  mongoose.connection.close();
}

module.exports = {
  startDb,
}