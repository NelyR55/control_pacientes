const mysql = require('mysql2');

// Imprimir toda la configuración para depuración
console.log('Configuración de la base de datos:');
console.log('MYSQL_URL:', process.env.MYSQL_URL || 'No definido');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST || 'No definido');
console.log('MYSQL_USER:', process.env.MYSQL_USER || 'No definido');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE || 'No definido');
console.log('MYSQL_PORT:', process.env.MYSQL_PORT || '3306');

let connection;

// Intentar primero con URL completa
if (process.env.MYSQL_URL) {
  try {
    connection = mysql.createConnection(process.env.MYSQL_URL);
    console.log('Intentando conexión con MYSQL_URL');
  } catch (error) {
    console.error('Error al crear conexión con URL:', error);
  }
} 
// Si no hay URL o falló, intentar con parámetros individuales
else {
  try {
    connection = mysql.createConnection({
      host: process.env.MYSQL_HOST || 'mysql.railway.internal',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'railway',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      // Añadir opciones para mejorar la estabilidad
      connectTimeout: 60000,
      acquireTimeout: 60000
    });
    console.log('Intentando conexión con parámetros individuales');
  } catch (error) {
    console.error('Error al crear conexión con parámetros:', error);
  }
}

// Probar la conexión
if (connection) {
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL:', err);
    } else {
      console.log('Conexión a MySQL establecida correctamente');
      
      // Probar consulta simple
      connection.query('SELECT 1 AS test', (err, results) => {
        if (err) {
          console.error('Error en consulta de prueba:', err);
        } else {
          console.log('Consulta de prueba exitosa:', results);
        }
      });
    }
  });
} else {
  console.error('No se pudo crear una conexión a la base de datos');
}

// Manejar desconexiones
connection.on('error', (err) => {
  console.error('Error en la conexión de base de datos:', err);
  
  // Si la conexión se perdió, intentar reconectar
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Intentando reconectar a la base de datos...');
    // En un entorno de producción, aquí implementarías la reconexión
  }
});

module.exports = connection;