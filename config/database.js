const mysql = require('mysql2');

// Asumiendo que ya configuraste todas estas variables en tu servicio
const config = {
  host: process.env.MYSQLHOST || 'mysql.railway.internal',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE || 'railway',
  port: process.env.MYSQLPORT || 3306
};

console.log('Intentando conectar con configuración:', JSON.stringify({
  host: config.host,
  user: config.user,
  database: config.database,
  port: config.port,
  // No imprimimos la contraseña por seguridad
}));

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL');
});

module.exports = connection;