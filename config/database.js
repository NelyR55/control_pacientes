const mysql = require('mysql2');

// Imprimir configuración para depuración
console.log('Configuración de la base de datos:');
console.log('MYSQL_URL:', process.env.MYSQL_URL || 'No definido');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'No definido');
console.log('MYSQL_USER:', process.env.MYSQL_USER || 'No definido');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'No definido');
console.log('MYSQL_PORT:', process.env.MYSQL_PORT || '3306');

let pool;

// Intentar primero con URL completa
if (process.env.MYSQL_URL) {
  try {
    pool = mysql.createPool(process.env.MYSQL_URL);
    console.log('Intentando pool con MYSQL_URL');
  } catch (error) {
    console.error('Error al crear pool con URL:', error);
  }
} 
// Si no hay URL o falló, intentar con parámetros individuales
else {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'mysql.railway.internal',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'railway',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      // Configuración para mejorar la estabilidad
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 60000,
      acquireTimeout: 60000
    });
    console.log('Intentando pool con parámetros individuales');
  } catch (error) {
    console.error('Error al crear pool con parámetros:', error);
  }
}

// Probar la conexión
if (pool) {
  pool.query('SELECT 1 AS test', (err, results) => {
    if (err) {
      console.error('Error en consulta de prueba:', err);
    } else {
      console.log('Conexión a MySQL establecida correctamente');
      console.log('Consulta de prueba exitosa:', results);
    }
  });
} else {
  console.error('No se pudo crear un pool de conexiones a la base de datos');
}

// Manejar errores del pool
pool.on('error', (err) => {
  console.error('Error en el pool de base de datos:', err);
});

module.exports = pool;