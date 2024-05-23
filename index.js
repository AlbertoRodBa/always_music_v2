const { Pool } = require('pg');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'always_music_v2',
    user: process.env.USER,
    password: process.env.PASS
};

const pool = new Pool(config);

// 1. Insertar nuevo estudiante
const insertEstudiante = async () => {
  try {
  
      const queryConfig = {
          text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *',
          values: [process.argv[2], process.argv[3], process.argv[4], Number(process.argv[5])],
          rowMode: 'array'
      };
      const result = await pool.query(queryConfig);
      console.log('Estudiante agregado con éxito:', result.rows);
  } catch (error) {
      console.error('Error al insertar estudiante:', error);
  }
};
// Llamado a función:
// insertEstudiante()

// Ejecutar para insertar estudiantes:
// node --env-file=.env index.js "Brian May" "11.234.567-8" "guitarra" 7
// node --env-file=.env index.js "Keith Moon" "12.225.222-9" "batería" 6

// Forzar error
// node --env-file=.env index.js "Ozzy Osbourne" "RUTconcaracteres" "sintetizador" nivelseis


// 2. Consultar estudiante por RUT
const selectEstudiantePorRut = async (rut) => {
    try {
        const queryConfig = {
            text: 'SELECT * FROM estudiantes WHERE rut = $1',
            values: [rut],
            rowMode: 'array'
        };
        const result = await pool.query(queryConfig);
        console.log('Estudiante encontrado por RUT:', result.rows);
    } catch (error) {
        console.error('Error al consultar estudiante por RUT:', error);
    }
};

// 3. Consultar por todos los estudiantes registrados
const obtenerTodosEstudiantes = async () => {
    try {
        const queryConfig = {
            text: 'SELECT * FROM estudiantes',
            rowMode: 'array'
        };
        const result = await pool.query(queryConfig);
        console.log('Estudiantes registrados:', result.rows);
    } catch (error) {
        console.error('Error al obtener todos los estudiantes:', error);
    }
};

// 4. Actualizar los datos de un estudiante en la base de datos
const actualizarEstudiante = async ({ nivelActual, nuevoNivel }) => {
    try {
        const queryConfig = {
            text: 'UPDATE estudiantes SET nivel = $1 WHERE nivel = $2',
            values: [nuevoNivel, nivelActual],
            rowMode: 'array'
        };
        const result = await pool.query(queryConfig);
        console.log('Datos del estudiante actualizados exitosamente:', result);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
    }
};

// 5. Eliminar un estudiante
const deleteEstudiante = async (rut) => {
    try {
        const queryConfig = {
            text: 'DELETE FROM estudiantes WHERE rut = $1',
            values: [rut],
            rowMode: 'array'
        };
        const result = await pool.query(queryConfig);
        console.log('Estudiante ha sido eliminado con éxito:', result);
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
    }
};


                                                         
// 1. Insertar estudiante nuevo:
// insertEstudiante();
// node --env-file=.env index.js "Brian May" "11.234.567-8" "guitarra" 7
// node --env-file=.env index.js "Keith Moon" "12.225.222-9" "batería" 6


// 2. Consulta por el estudiante según RUT
// selectEstudiantePorRut('12.345.678-9');                                    

// 3. Obtener todos los estudiantes registrados
//obtenerTodosEstudiantes(); 

// 4. Actualizar estudiante - Se cambia n° del nivel 
// actualizarEstudiante();     

// 5. Eliminará estudiante según RUT 
// deleteEstudiante('12.345.678-9');                                          

