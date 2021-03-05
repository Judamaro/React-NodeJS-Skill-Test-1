const express = require('express');
const bodyParser = require('body-parser');

//Initializar
const app = express();

//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use(require('./src/routes/routes'));

//iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});