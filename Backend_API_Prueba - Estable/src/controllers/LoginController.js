//Importacion
const { Pool } = require('pg');
const validator = require('validator');

//Variables Globales
var validatorSesion;

//Conexion a la base de datos
const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'DB_Prueba_Decondux',
    password: '1234'

});

//Función Login Admin
const LogInAdmin = async (req, res) => {
    try {

        //Consultar seción activa
        let response = await pool.query('SELECT * FROM usuario WHERE usuario_u=' + "'" + req.body.usuarioU + "'" + " AND contrasena_u=" + "'" + req.body.contraseU + "'" + "AND id_rol_usuario_fk=1 AND session_u=false;")

        //Si existe key en el obj es porque existe sesion activa del usuario
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return true;
                }
                return false;
            }
        }

        //Con la funcion anterior, si es true = existe sesion si es false= no existe sesion
        if (isEmpty(response.rows[0])) {
            validatorSesion = true;
        } else {
            validatorSesion = false;
        }

        //Si no hay sesion activa, entra y activa una sesion
        if (validatorSesion) {
            pool.query('UPDATE usuario SET session_u = true WHERE usuario_u='+"'"+ req.body.usuarioU +"' ;");
            res.status(200).send({
                sesion: "activated",
                message: "Bienvenido"
            })
        } else {
            res.status(403).send({
                sesion: "Error",
                message: "Sesión ya iniciada o Usuario no válido"
            })
        }

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

const LogInUser = async (req, res) => {
    
    try {

        //Consultar seción activa
        let response = await pool.query('SELECT * FROM usuario WHERE usuario_u=' + "'" + req.body.usuarioU + "'" + " AND contrasena_u=" + "'" + req.body.contraseU + "'" + "AND id_rol_usuario_fk=2 AND session_u=false;")

        //Si existe key en el obj es porque existe sesion activa del usuario
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return true;
                }
                return false;
            }
        }

        //Con la funcion anterior, si es true = existe sesion si es false= no existe sesion
        if (isEmpty(response.rows[0])) {
            validatorSesion = true;
        } else {
            validatorSesion = false;
        }

        //Si no hay sesion activa, entra y activa una sesion
        if (validatorSesion) {
            pool.query('UPDATE usuario SET session_u = true WHERE usuario_u='+"'"+ req.body.usuarioU +"' ;");
            res.status(200).send({
                sesion: "activated",
                message: "Bienvenido"
            })
        } else {
            res.status(403).send({
                sesion: "Error",
                message: "Sesión ya iniciada o Usuario no válido"
            })
        }

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion LogOut
const LogOut = async (req, res) => {
    try {
        pool.query('UPDATE usuario SET session_u = false WHERE usuario_u='+"'"+req.body.usuarioU +"' ;");
        res.status(200).send({
            sesion: "finish",
            message: "Sesión finalizada"
        })

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}


module.exports = {

    LogInAdmin,
    LogOut,
    LogInUser

}

