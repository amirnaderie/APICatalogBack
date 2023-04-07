const sqlite3 = require('sqlite3').verbose();
// this file is only for mongoose connection
const db=()=> {
  let conn = new sqlite3.Database('./db/ApiCatalogDB.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
  global.db=conn;
}

module.exports = db;