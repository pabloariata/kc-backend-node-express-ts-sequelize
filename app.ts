/* Archivo de inicio de la aplicación */
import dotenv from 'dotenv';
import Server from './server/server';

/* Inicializamos dotenv con configuración por defecto */
dotenv.config();

/* Inicializamos una instancia del servidor de express */
const server = new Server();

 /* Para las pruebas */
export const app = server.app;

server.listen();
