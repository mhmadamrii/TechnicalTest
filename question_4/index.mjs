import express from 'express';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from './connection/db_config.js'
import upload from './middlewares/uploadFile.js'

const app = express()
const __filename = fileURLToPath(
    import.meta.url
);
const __dirname = dirname(__filename);

app.use('/public', express.static(__dirname + '/public'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'hbs')

// get 
app.get('/', (req, res) => {
    const sql = "SELECT * FROM provinsi_tb";

    db.query(sql, function (err, result) {
      if (err) throw err;

      console.log(`Id \t Nama \t Diresmikan \t Pulau `);
      console.log(`====================================================================`);
      result.forEach((data) => {
        console.log(`${data.id} \t ${data.nama} \t ${data.diresmikan} \t ${data.pulau}`);
      });

      console.log(`====================================================================`);
      result.forEach((data) => {
        console.log(`${data.nama} -> ${data.pulau}`);
      });

      const dataProvinsi = result

      const fetchProvinsi = dataProvinsi.map((data) => {
        data.photo = '/uploads/' + data.photo
        return data
      })

      const sql2 = "SELECT * FROM kabupaten_tb";

    db.query(sql2, function (err, result) {
      if (err) throw err;;

      const dataKabupaten = result

      const fetchKabupaten = dataKabupaten.map((data) => {
        data.photo = '/uploads/' + data.photo
        return data
      })

      res.render('index', {provinsi: fetchProvinsi, kabupaten: fetchKabupaten})
    });
    
    })
})

app.get('/province-detail/:id', (req, res) => {
    let id = req.params.id

    const sql = `SELECT * FROM provinsi_tb WHERE provinsi_tb.id=${id}`;

    db.query(sql, function (err, result) {
        if (err) throw err;
  
        console.log(`ID \t NAME \t Diresmikan \t Pulau `);
        console.log(`----------------------------------------------------------`);
        result.forEach((data) => {
          console.log(`${data.id} \t ${data.nama} \t ${data.diresmikan} \t ${data.pulau}`);
        });
  
        console.log(`----------------------------------------------------------`);
        result.forEach((data) => {
          console.log(`${data.nama} -> ${data.pulau}`);
        });
  
        const dataProvinsi = result

        const fetchProvinsi = dataProvinsi.map((data) => {
            data.photo = 'http://localhost:3000/uploads/' + data.photo
            return data
        })
  
        res.render('detail', {provinsi: fetchProvinsi, id: id})
      });
})

app.get('/city-detail/:id', (req, res) => {
    let id = req.params.id

    const sql = `SELECT * FROM kabupaten_tb WHERE kabupaten_tb.id=${id}`;

    db.query(sql, function (err, result) {
        if (err) throw err;
  
        const dataKabupaten = result

        const fetchKabupaten = dataKabupaten.map((data) => {
            data.photo = 'http://localhost:8080/uploads/' + data.photo

            return data
        })
  
        res.render('citydetail', {kabupaten: fetchKabupaten, id: id})
      });
})

app.get('/update-province/:id', (req, res) => {

    let id = req.params.id

    const sql = `SELECT * FROM provinsi_tb WHERE provinsi_tb.id=${id}`;

    db.query(sql, function (err, result) {
        if (err) throw err;
  
        console.log(`Id \t Nama \t Diresmikan \t Pulau `);
        console.log(`----------------------------------------------------------`);
        result.forEach((data) => {
          console.log(`${data.id} \t ${data.nama} \t ${data.diresmikan} \t ${data.pulau}`);
        });
  
        console.log(`----------------------------------------------------------`);
        result.forEach((data) => {
          console.log(`${data.nama} -> ${data.pulau}`);
        });
  
        const dataProvinsi = result
  
        res.render('updateprovince', {provinsi: dataProvinsi, id: id})
      });
  
})

app.get('/update-city/:id', (req, res) => {

    let id = req.params.id

    const sql = `SELECT * FROM kabupaten_tb WHERE kabupaten_tb.id=${id}`;

    db.query(sql, function (err, result) {
        if (err) throw err;
  
        const dataKabupaten = result
  
        res.render('updatecity', {kabupaten: dataKabupaten, id: id})
      });
  
})

app.get('/add-province', (req, res) => {
    res.render('addprovince')
})

app.get('/add-city', (req, res) => {
    const sql = "SELECT * FROM provinsi_tb";

    db.query(sql, function (err, result) {
      if (err) throw err;

      const dataProvinsi = result

      const fetchProvinsi = dataProvinsi.map((data) => {
        data.photo = '/uploads/' + data.photo
        return data
      })

      res.render('addcity', {provinsi: fetchProvinsi})
    });
})

app.get('/delete-provinsi/:id', (req, res) => {

    const id = req.params.id

    const sql = `DELETE FROM provinsi_tb WHERE provinsi_tb.id=${id}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
  
        res.redirect('/')
        })
})

app.get('/delete-city/:id', (req, res) => {

    const id = req.params.id

    const sql = `DELETE FROM kabupaten_tb WHERE kabupaten_tb.id=${id}`;
    db.query(sql, function (err, result) {
        if (err) throw err;
  
        res.redirect('/')
        })
})

// post 
app.post('/addprovince', upload.single('photo'), (req, res) => {

    let nama = req.body.nama
    let diresmikan = req.body.diresmikan
    let photo = req.file.filename
    let pulau = req.body.pulau

    const sql = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES ('${nama}', '${diresmikan}', '${photo}', '${pulau}');`;

    db.query(sql, function (err, result) {
      if (err) throw err;

      res.redirect('/')
      })

})

app.post('/addcity', upload.single('photo'), (req, res) => {

    let nama = req.body.nama
    let diresmikan = req.body.diresmikan
    let photo = req.file.filename
    let city = req.body.city

    const sql = `INSERT INTO kabupaten_tb (nama, diresmikan, photo, provinsi_id) VALUES ('${nama}', '${diresmikan}', '${photo}', '${city}');`;

    db.query(sql, function (err, result) {
      if (err) throw err;

      res.redirect('/')
      })

})

app.post('/updateprovince/:id', upload.single('photo'), (req, res) => {

    const id = req.params.id

    let nama = req.body.nama
    let diresmikan = req.body.diresmikan
    let photo = req.file.filename
    let pulau = req.body.pulau

    const sql = `UPDATE provinsi_tb SET nama='${nama}', diresmikan='${diresmikan}', photo='${photo}', pulau='${pulau}' WHERE provinsi_tb.id='${id}'`;

    db.query(sql, function (err, result) {
      if (err) throw err;

      res.redirect('/')
      })

})

app.post('/updatecity/:id', upload.single('photo'), (req, res) => {

    const id = req.params.id

    let nama = req.body.nama
    let diresmikan = req.body.diresmikan
    let photo = req.file.filename
    let provinsi = req.body.provinsi

    const sql = `UPDATE kabupaten_tb SET nama='${nama}', diresmikan='${diresmikan}', photo='${photo}', provinsi_id='${provinsi}' WHERE kabupaten_tb.id='${id}'`;

    db.query(sql, function (err, result) {
      if (err) throw err;

      res.redirect('/')
      })

})

const port = 3000
app.listen(port, function() {
    console.log(`Server running on port: ${port}`)
})