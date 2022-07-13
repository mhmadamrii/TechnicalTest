const db = require('../index')
const sql = 'SELECT * FROM provinsi'

db.query(sql, function (err, result) {
    if (err) throw err
    console.log(result)
})