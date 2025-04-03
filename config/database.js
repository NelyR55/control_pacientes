const mysql = require('mysql2');

// Habilitar logs para depuración
console.log('Configuración de la base de datos:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
console.log('MYSQL_PORT:', process.env.MYSQL_PORT);

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'control_pacientes',
  port: process.env.MYSQL_PORT || 3306,
  // Agregar opciones de reintento y tiempo de espera
  connectTimeout: 60000,
  ssl: process.env.MYSQL_CERT ? {ca: process.env.MYSQL_CERT} : false
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;