const { startDb, closeDb } = require('./db');
const { Question } = require('./models/question');
const { data } = require('./data');

async function migrateData() {
  // Looping through the questions from the data.js file
  for (let i = 0; i < data.length; i++) {
    const q = data[i];
    const data = {
      questiontxt: q.questiontxt,
      repjuste: q.repjuste,
      repfausse1: q.repfausse1,
      repfausse2: q.repfausse2,
      repfausse3: q.repfausse3,
      info2: q.info2,
      info: q.info,
      type: q.type
    }
    await Question.create(data);
  }
}

async function migrate() {
  startDb();
  await migrateData();
  closeDb();
}