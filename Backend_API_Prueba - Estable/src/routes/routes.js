const { Router } = require('express');
const router = Router();

//Funciones CRUD Empleados
const { InsertEmpleado, ListEmpleados, EditEmpleado, DeleteEmpleado } = require('../controllers/EmpleadoController');

//Funciones CRUD Usuarios
const { InsertUsuario, ListUsuarios, EditUsuario, DeleteUsuario, getUsuario } = require('../controllers/UsuarioController');

//Funciones Admin
const { LogInAdmin, LogOut, LogInUser } = require('../controllers/LoginController');

//Rutas
//Empleado
router.post('/insertEmpleado', InsertEmpleado);
router.get('/listarEmpledos', ListEmpleados);
router.put('/updateEmpleado', EditEmpleado);
router.delete('/deleteEmpleado', DeleteEmpleado);
//Usuario
router.post('/insertUsuario', InsertUsuario);
router.get('/listUsuarios', ListUsuarios);
router.put('/updateUsuario', EditUsuario);
router.delete('/deleteUsuario', DeleteUsuario);
router.get('/usuario/:id', getUsuario);
//Login Admin
router.post('/loginAdmin', LogInAdmin);
router.post('/loginUser', LogInUser);
router.put('/logout', LogOut);

//Exportar el router
module.exports = router;