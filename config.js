require('dotenv').config();
const port = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const secret = process.env.SECRET;
const database = 'mongodb://localhost:' + port + '/' + dbName;

module.exports = {
  secret,
  database
};