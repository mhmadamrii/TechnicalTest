const db = require('../index')
const sql = `CREATE TABLE kabupaten
(
    id int NOT NULL AUTO_INCREMENT,
    nama VARCHAR(255),
    provinsi_id int,
    diresmikan VARCHAR(255),
    photo VARCHAR(255),
    PRIMARY KEY (id),
)`;
// const sql = `CREATE TABLE provinsi
// (
//     id int NOT NULL AUTO_INCREMENT,
//     nama VARCHAR(255),
//     diresmikan VARCHAR(255),
//     photo VARCHAR(255),
//     pulau VARCHAR(255),
//     PRIMARY KEY (id)
// )`;

db.query(sql, function (err, result) {
    if (err) throw err
    console.log('table created')
})