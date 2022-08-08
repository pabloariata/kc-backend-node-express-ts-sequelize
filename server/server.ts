import express, {Application} from 'express';
import cors from 'cors';

import db from '../db/db';

import customerRoutes from '../routes/customers';
import productRoutes from '../routes/products';
import purchaseRoutes from '../routes/purchases';

class Server {

    public app: Application;
    private port: string;

    private apiPaths = {
        customers: '/api/customers',
        products: '/api/products',
        purchase: '/api/purchases',
    }

    constructor() {

        /* Inicializamos una instancia de express y declaramos el puerto el cual estará escuchando */
        this.app = express();
        this.port = process.env.PORT || '3000';

      

        /* Conexion con base de datos */
        this.conectarABaseDeDatos();

        /* Inicializamos los middlewares */
        this.middlewares();

        /* Definimos las rutas */
        this.routes();

    }

    // Conexion a base de datos
    async conectarABaseDeDatos() {

        try {
            console.log('Iniciando conexión a base de datos');
            await db.authenticate();
            console.log('Base de Datos conectada');

            // console.log('Sincronizando base de datos con modelos del ORM');
            // await db.sync();
            // console.log('Sincronizacion finalizada');

        } catch (error) {
            console.log(error);
            throw new Error('Error al conectarse a la base de datos');
        }

    }

    /* Funciones que se ejecutan antes de otros procedimientos */
    middlewares() {
        //  Configuramos/habilitamos CORS
        this.app.use(cors());
        // Lectura del body de las peticiones parseadas en JSON
        this.app.use(express.json());
         // Carpeta publica que servira el backend
         this.app.use(express.static('public'));

    }

    routes() {
        /* Declaramos las rutas del API */
        this.app.use(this.apiPaths.customers, customerRoutes);
        this.app.use(this.apiPaths.products, productRoutes);
        this.app.use(this.apiPaths.purchase, purchaseRoutes);
    }

    /* Levantamos servidor en el puerto especificado */
    listen() {
        if (process.env.NODE_ENV !== 'test') {
            this.app.listen(this.port, () => {
                console.log(`Servidor corriendo en puerto ${this.port}`);
            });
        }
    }

}

export default Server;