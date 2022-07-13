const db = require('../index')
const sql  = `INSERT INTO provinsi (nama, diresmikan, photo, pulau)
VALUES ('Jawa Timur', '12 Oktober 1945', 'jatim.png', 'Jawa')`

db.query(sql, function (err, result) {
    if (err) throw err
    console.log('1 record inserted')
})