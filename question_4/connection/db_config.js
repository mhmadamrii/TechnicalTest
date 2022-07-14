let mysql = require('mysql');

let db = mysql.createConnection({
    host: "localhost",
    database: "test",
    user: "root",
    password: ""
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = db