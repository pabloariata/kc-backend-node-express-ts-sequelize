/* Configuración del ORM Sequelize, conexion a base de datos mysql */
import { Sequelize } from 'sequelize';


// TODO: declarar en env las variables de conexion a la base de datos
const db = new Sequelize('kupay', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});


/* Para crear la estructura de la base en DEV ENV */
// db.sync({force: true});

// db.sync({alter: true});

export default db;