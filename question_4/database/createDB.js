let db = require('../index')

const sql = "CREATE DATABASE myData";
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log('database created')
})