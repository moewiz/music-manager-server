require('dotenv').config();
let usr = process.env.DB_USR;
let pwd = process.env.DB_PWD;
let port = process.env.DB_PORT;
let db_name = process.env.DB_NAME;

let secret = process.env.SECRET;
let database = 'mongodb://localhost:' + port + '/' + db_name;

module.exports = {
  'secret': secret,
  'database': database
};