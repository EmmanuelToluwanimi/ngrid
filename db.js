const db = require('knex')({
  client: 'mysql2',
  connection: {
    host: '',
    port: '',
    user: '',
    password: '',
    database: '',
  },
  log: (x) => { console.log(x) }
});

module.exports = db;