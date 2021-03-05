//Inicializar y crear conexion a postgres
const {Client} = require('pg');
const options = {

    host: 'localhost',
    user: 'postgres',
    database: 'DB_Prueba_Decondux',
    password: '1234'

};

const database = new Client(options);

database.connect()
.then(client => console.log('database connected'))
.catch(err => console.error(error));

module.exports = database;