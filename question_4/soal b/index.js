const express = require('express')
const mysql = require('mysql')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myData'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('mysql connected')
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/assets', express.static(__dirname + '/public'))

// fetching from database
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM provinsi'
    let query = connection.query(sql, (err, results) => {
        if(err) throw err
        res.render('provinsi', {
            results: results
        })
    })
})

// insert into database
// app.post('add-province', (req, res) => {
//     let data = {nama}
// })

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})