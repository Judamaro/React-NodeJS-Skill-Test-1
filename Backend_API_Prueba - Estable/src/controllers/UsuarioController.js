//Importacion
const { Pool } = require('pg');
const validator = require('validator');
const { validate } = require('secure-password-validator');

//Variables Globales
var validatorRegistro;

//Configuracion de valide para mayusculas y numeros
const options = {
    digits: true,
    letters: true,
    uppercase: true,
    lowercase: true,
    symbols: false
}

//Conexion a la base de datos
const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'DB_Prueba_Decondux',
    password: '1234'

});

//Funcion crear usuario
const InsertUsuario = async (req, res) => {
    try {

        //Consultar existencia del registro con el usuario
        let response = await pool.query('SELECT * FROM usuario WHERE usuario_u = ' + "'" + req.body.usuarioU + "'" + ';');

        //Si existe key en el obj es porque existe el registro
        function isEmpty(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return true;
                }
                return false;
            }
        }

        //Con la funcion anterior, si es true = existe registro si es false= no existe registro
        if (isEmpty(response.rows[0])) {
            validatorRegistro = true;
        } else {
            validatorRegistro = false;
        }

        if (!validatorRegistro) {

            try {
                //Validar que existan los datos
                var validatorNombreU = !validator.isEmpty(req.body.nombreU);
                var validatorUsuarioU = !validator.isEmpty(req.body.usuarioU);
                var validatorImag = !validator.isEmpty(req.body.imgU);

                //Validar de que la contraseña ingresada contenga numeros y letras mayusculas
                var validatorContra = validate(req.body.contraseU, options);
                var validatorContraseñaU = validatorContra.valid;

                console.log(validatorNombreU);
                console.log(validatorUsuarioU);
                console.log(validatorContraseñaU);
                console.log(validatorImag);
                ////Validar que todos los datos esten correctos y guardar
                if (validatorNombreU && validatorUsuarioU && validatorContraseñaU && validatorImag) {
                    
                    const response = await pool.query('INSERT INTO usuario (nombre_u, usuario_u, contrasena_u, id_rol_usuario_fk, imagen_u, session_u) VALUES ($1, $2, $3, $4, $5, $6)',
                        [req.body.nombreU, req.body.usuarioU, req.body.contraseU, 2, req.body.imgU, false]);
                    console.log(response);
                    res.status(201).send('Usuario Registrado');
                } else {
                    res.status(500).send('Error revisar los datos ingresados');
                }

            } catch (error) {
                res.status(500).send('Error el guardar el registro');
                console.log(error);
            }

        } else {
            res.status(500).send('Error, ya existe el registro');
        }

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion para listar los usuarios
const ListUsuarios = async (req, res) => {


    try {
        const response = await pool.query('SELECT * FROM usuario');
        res.status(201).send(response.rows);
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion para editar el usuario
const EditUsuario = async (req, res) => {

    try {

        console.log(req.body);
        var id_user_select = req.body.id_user;

        try {

            //Validar que existan los datos
            var validatorNombreU = !validator.isEmpty(req.body.nombreU);
            var validatorUsuarioU = !validator.isEmpty(req.body.usuarioU);
            var validatorImag = !validator.isEmpty(req.body.imgU);

            //Validar de que la contraseña ingresada contenga numeros y letras mayusculas
            var validatorContra = validate(req.body.contraseU, options);
            var validatorContraseñaU = validatorContra.valid;

            ////Validar que todos los datos esten correctos y guardar
            if (validatorNombreU && validatorUsuarioU && validatorContraseñaU && validatorImag) {
                const response = await pool.query("UPDATE usuario  SET nombre_u ="+"'"+req.body.nombreU+"'"+", usuario_u ="+"'"+req.body.usuarioU+"'"+", contrasena_u ="+"'"+req.body.contraseU+"'"+", id_rol_usuario_fk = 2, imagen_u="+"'"+req.body.imgU+"'"+" WHERE id_usuario="+id_user_select+";");
                console.log(response.rows);
                res.status(201).send('Usuario Actualizado');
            } else {
                res.status(500).send('Error revisar los datos ingresados');
            }

        } catch (error) {
            res.status(500).send('Error el actualizar el registro');
            console.log(error);
        }

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion para eliminar el usuario
const DeleteUsuario = async (req, res) => {

    try {
        
        var id_user_select = req.body.id_user;

        const response = await pool.query('DELETE FROM usuario WHERE id_usuario = ' + id_user_select + ';');

        res.status(201).send('Se eliminó el registro');

    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion obtener un ususario por id
const getUsuario = async (req, res) => {

    var id_user_select = req.params.id;

    try {
        const response = await pool.query('SELECT * FROM usuario WHERE id_usuario = ' + id_user_select);
        res.status(201).send(response.rows[0]);
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}


module.exports = {

    InsertUsuario,
    ListUsuarios,
    EditUsuario,
    DeleteUsuario,
    getUsuario

}