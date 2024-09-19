const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://10.0.11.28:5500'
  }));

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Score'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });

app.use(express.json());


app.post('/guardar-puntaje', (req, res) => {
  const { tiempo, puntos, nombre } = req.body;
  const fecha = new Date().toISOString().slice(0, 10);

  const query = 'INSERT INTO score (tiempo, puntos, fecha, nombre) VALUES (?, ?, ?, ?)';
  connection.query(query, [tiempo, puntos, fecha, nombre], (err, result) => {
    if (err) {
      console.error('Error al guardar el puntaje:', err);
      res.status(500).send('Error al guardar el puntaje');
    } else {
      res.send('Puntaje guardado correctamente');
    }
  });
});


app.get('/tabla-posiciones', (req, res) => {
  const query = 'SELECT * FROM score ORDER BY puntos DESC LIMIT 10';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la tabla de posiciones:', err);
      res.status(500).send('Error al obtener la tabla de posiciones');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });