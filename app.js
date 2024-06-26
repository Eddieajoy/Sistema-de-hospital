// Importa las dependencias necesarias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Crea una instancia de Express
const app = express();
const port = 3000; // Puerto en el que escuchará el servidor

// Middleware para parsear application/json
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'bmzecarpgaap5hrrk73t-mysql.services.clever-cloud.com',
  user: 'up4a5borknzmkmpp',
  password: 'Us8VNcOCaLuFGuRMmec0',
  database: 'bmzecarpgaap5hrrk73t'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión establecida con la base de datos MySQL');
});

// Rutas para obtener todos los pacientes
app.get('/pacientes', (req, res) => {
  db.query('SELECT * FROM pacientes', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener pacientes' });
      return;
    }
    res.json(result);
  });
});

// Ruta para agregar un nuevo paciente
app.post('/pacientes', (req, res) => {
  const { nombre, edad, direccion } = req.body;
  const sql = 'INSERT INTO pacientes (nombre, edad, direccion) VALUES (?, ?, ?)';
  db.query(sql, [nombre, edad, direccion], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar paciente' });
      return;
    }
    res.status(201).json({ message: 'Paciente agregado correctamente' });
  });
});

// Rutas para obtener todos los doctores
app.get('/doctores', (req, res) => {
  db.query('SELECT * FROM doctores', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener doctores' });
      return;
    }
    res.json(result);
  });
});

// Ruta para agregar un nuevo doctor
app.post('/doctores', (req, res) => {
  const { nombre, especialidad } = req.body;
  const sql = 'INSERT INTO doctores (nombre, especialidad) VALUES (?, ?)';
  db.query(sql, [nombre, especialidad], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar doctor' });
      return;
    }
    res.status(201).json({ message: 'Doctor agregado correctamente' });
  });
});

// Rutas para obtener todas las citas
app.get('/citas', (req, res) => {
  db.query('SELECT * FROM citas', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener citas' });
      return;
    }
    res.json(result);
  });
});

// Ruta para agregar una nueva cita
app.post('/citas', (req, res) => {
  const { paciente_id, doctor_id, fecha_cita, motivo } = req.body;
  const sql = 'INSERT INTO citas (paciente_id, doctor_id, fecha_cita, motivo) VALUES (?, ?, ?, ?)';
  db.query(sql, [paciente_id, doctor_id, fecha_cita, motivo], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al agregar cita' });
      return;
    }
    res.status(201).json({ message: 'Cita agregada correctamente' });
  });
});

// Escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
