const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const { createTables } = require('./setup-database'); // Importar la función

const app = express();

app.use(cors());
app.use(express.json());

// Ruta básica para health check
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createTables(); // Crear las tablas al iniciar el servidor
});