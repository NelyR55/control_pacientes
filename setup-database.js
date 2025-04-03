const db = require('./config/database');

const createTables = () => {
  console.log('Configurando base de datos...');

  // Tabla users
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id int(11) NOT NULL AUTO_INCREMENT,
      email varchar(255) NOT NULL,
      password varchar(255) NOT NULL,
      role varchar(50) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `;

  // Tabla patients
  const createPatientsTable = `
    CREATE TABLE IF NOT EXISTS patients (
      id int(11) NOT NULL AUTO_INCREMENT,
      nombre_completo varchar(255) NOT NULL,
      fecha_nacimiento date NOT NULL,
      edad int(11) NOT NULL,
      fecha_ingreso date NOT NULL,
      diagnostico text DEFAULT NULL,
      riesgo_caidas varchar(100) NOT NULL,
      riesgo_upp varchar(100) NOT NULL,
      ingresa_con_upp enum('Sí','No') DEFAULT 'No',
      descripcion_upp text DEFAULT NULL,
      dispositivos_invasivos longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
      presenta_upp enum('Sí','No') DEFAULT 'No',
      egreso_upp text DEFAULT NULL,
      presenta_caida enum('Sí','No') DEFAULT 'No',
      egreso_caida text DEFAULT NULL,
      servicio varchar(100) DEFAULT 'Medicina Interna',
      fecha_egreso date DEFAULT NULL,
      motivo_egreso text DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  `;

  // Crear tabla users
  db.query(createUsersTable, (err) => {
    if (err) {
      console.error('Error creando tabla users:', err);
    } else {
      console.log('Tabla users creada o ya existente');
      
      // Verificar si hay usuarios para no duplicar
      db.query('SELECT COUNT(*) as count FROM users', (err, results) => {
        if (err) {
          console.error('Error verificando usuarios:', err);
        } else if (results[0].count === 0) {
          // Insertar usuarios de ejemplo si no hay ninguno
          const insertUsers = `
            INSERT INTO users (email, password, role) VALUES
            ('oscar.vega.calidad@gmail.com', '$2b$10$XN5XK.z32hA5Z6ia80HX3uO8PUHlmzmp/l0/L0dmeTCQbC5afXryy', 'Admin'),
            ('nelyr844@gmail.com', '$2b$10$AZMjObxO4UFeJTrNa0kge.ksyMJHGsDPDZ9t2IpwxH5Rqp1o26sKu', 'Enfermero');
          `;
          
          db.query(insertUsers, (err) => {
            if (err) {
              console.error('Error insertando usuarios de ejemplo:', err);
            } else {
              console.log('Usuarios de ejemplo insertados correctamente');
            }
          });
        }
      });
    }
  });

  // Crear tabla patients
  db.query(createPatientsTable, (err) => {
    if (err) {
      console.error('Error creando tabla patients:', err);
    } else {
      console.log('Tabla patients creada o ya existente');
      
      // Verificar si hay pacientes para no duplicar
      db.query('SELECT COUNT(*) as count FROM patients', (err, results) => {
        if (err) {
          console.error('Error verificando pacientes:', err);
        } else if (results[0].count === 0) {
          // Insertar paciente de ejemplo si no hay ninguno
          const insertPatient = `
            INSERT INTO patients (nombre_completo, fecha_nacimiento, edad, fecha_ingreso, diagnostico, 
            riesgo_caidas, riesgo_upp, ingresa_con_upp, descripcion_upp, dispositivos_invasivos, 
            presenta_upp, egreso_upp, presenta_caida, egreso_caida, servicio, fecha_egreso, motivo_egreso) 
            VALUES ('juan pérea', '1985-05-15', 39, '2025-02-26', 'cetoacidosis diabética', 
            'mediano', 'alto', 'No', '', '[\"CVC\",\"Sonda Vesical\",\"Otro: catéter tenckoff\"]', 
            'Sí', 'Sacro tipo 1', 'Sí', 'cayó de su propia altura el 02 de marzo al intentar levantarse.', 
            'Medicina Interna', '2025-03-03', 'MEJORIA');
          `;
          
          db.query(insertPatient, (err) => {
            if (err) {
              console.error('Error insertando paciente de ejemplo:', err);
            } else {
              console.log('Paciente de ejemplo insertado correctamente');
            }
          });
        }
      });
    }
  });
};

module.exports = { createTables };