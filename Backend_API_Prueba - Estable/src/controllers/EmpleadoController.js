//Importacion
const { Pool } = require('pg');
const validator = require('validator');

//Variables Globales
var validatorRegistro;
var idCateg;

const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    database: 'DB_Prueba_Decondux',
    password: '1234'

});

//Funcion para guardar registro del empleado
const InsertEmpleado = async (req, res) => {

    try {

        //Consultar existencia del registro con la cc del empleado
        let response = await pool.query('SELECT * FROM empleado WHERE cc_empleado = '+req.body.CcE+';');

        //Si existe key en el obj es porque existe el registro
        function isEmpty(obj){
            for(var key in obj){
                if(obj.hasOwnProperty(key)){
                    return true;
                }
                return false;
            }
        }

        //Con la funcion anterior, si es true = existe registro si es false= no existe registro
        if (isEmpty(response.rows[0])){
            validatorRegistro = true;
        }else{
            validatorRegistro = false;
        }
        console.log(response.rows[0]);
        console.log(validatorRegistro);

        //Al no existir registro se procede a guardar el registro
        if(!validatorRegistro) {

            try {

                //Validar y Categorizar
                if (req.body.SalarE <= 1000000) {
                    idCateg = 1;
                    validatorIdCateg = true;
                } else if (req.body.SalarE <= 3000000) {
                    idCateg = 2;
                    validatorIdCateg = true;
                } else if (req.body.SalarE <= 5000000) {
                    idCateg = 3;
                    validatorIdCateg = true;
                } else {
                    validatorIdCateg = false;
                }
        
                //Validar que existan datos ingresados
                var validatorNameE = !validator.isEmpty(req.body.nombreE);
                var validatorApellE = !validator.isEmpty(req.body.apellE);
                var validatorCcE = !validator.isEmpty(req.body.CcE);
                var validatorTelE = !validator.isEmpty(req.body.TelE);
                var validatorSalarE = !validator.isEmpty(req.body.SalarE);
                var validatorEmailE = !validator.isEmpty(req.body.EmailE);
                var validatorNombEmpresa = !validator.isEmpty(req.body.NombEmpresa);
        
                //Validar que todos los datos esten correctos y guardar
                if (validatorNameE && validatorApellE && validatorCcE && validatorTelE && validatorSalarE && validatorEmailE && validatorNombEmpresa && validatorIdCateg) {
                    const response = await pool.query('INSERT INTO empleado VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.nombreE, req.body.apellE, req.body.CcE, req.body.TelE, req.body.SalarE, req.body.EmailE, req.body.NombEmpresa, idCateg]);
                    console.log(response);
                    res.status(201).send('Empleado Registrado');
        
                } else {
                    res.status(500).send('Error revisar los datos ingresados');
                }
        
            } catch (error) {
                res.status(500).send('Error al guardar registro');
                console.log(error);
            }
    
        }else{      
            res.status(500).send('Error, ya existe el registro');
        }
        
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }
    
}

//Funcion para listar Empleados
const ListEmpleados = async (req, res) => {

    try {     
        const response = await pool.query('SELECT * FROM empleado');
        console.log(response.rows[0]);
        res.status(201).send('Listado Completo de los Empleados');
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion para editar Empleado
const EditEmpleado = async (req, res) => {

    try {

        var cc_empleado_sele = req.body.ccEmSelected;

        //Validar y Categorizar    
        if (req.body.SalarE <= 1000000) {
            idCateg = 1;
            validatorIdCateg = true;
        } else if (req.body.SalarE <= 3000000) {
            idCateg = 2;
            validatorIdCateg = true;
        } else if (req.body.SalarE <= 5000000) {
            idCateg = 3;
            validatorIdCateg = true;
        } else {
            validatorIdCateg = false;
        }

        //Validar que existan datos ingresados
        var validatorNameE = !validator.isEmpty(req.body.nombreE);
        var validatorApellE = !validator.isEmpty(req.body.apellE);
        var validatorCcE = !validator.isEmpty(req.body.CcE);
        var validatorTelE = !validator.isEmpty(req.body.TelE);
        var validatorSalarE = !validator.isEmpty(req.body.SalarE);
        var validatorEmailE = !validator.isEmpty(req.body.EmailE);
        var validatorNombEmpresa = !validator.isEmpty(req.body.NombEmpresa);

        //Validar que todos los datos esten correctos y actualizar el registro
        if (validatorNameE && validatorApellE && validatorCcE && validatorTelE && validatorSalarE && validatorEmailE && validatorNombEmpresa && validatorIdCateg){
            const response = await pool.query("UPDATE empleado SET nombre_empleado= "+"'"+req.body.nombreE+"'"+", apellido_empleado="+"'"+req.body.apellE+"'"+", cc_empleado="+"'"+req.body.CcE+"'"+
            ", telefono_empleado="+"'"+req.body.TelE+"'"+", salario_empleado="+req.body.SalarE+" , email_empleado="+"'"+req.body.EmailE+"'"+
            ", nombre_empresa="+"'"+req.body.NombEmpresa+"'"+", id_categoria_fk="+idCateg+" WHERE cc_empleado="+cc_empleado_sele)+";";

            console.log(pool);
            console.log(response);
            res.status(201).send('Se actualizo el registro');
        }else{
            res.status(500).send('Error revisar los datos ingresados');
        }
        
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}

//Funcion para eliminar registro empleado
const DeleteEmpleado = async (req, res) => {

    try {

        var cc_empleado_sele = req.body.ccEmSelected;

        const response = await pool.query('DELETE FROM empleado WHERE cc_empleado='+cc_empleado_sele+';');

        res.status(201).send('Se eliminó el registro');
        
    } catch (error) {
        res.status(500).send('Error en la función');
        console.log(error);
    }

}


module.exports = {

    InsertEmpleado,
    ListEmpleados,
    EditEmpleado,
    DeleteEmpleado
}

