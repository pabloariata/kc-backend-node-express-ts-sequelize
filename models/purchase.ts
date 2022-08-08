/* Purchase DB Model */

import { DataTypes } from 'sequelize';
import db from '../db/db';
import Customer from '../models/customer';
import Product from '../models/product';

const Purchase = db.define('Purchase', {

    /* Cantidad comprados de este producto */
   quantity: {
    type: DataTypes.INTEGER
   },
    /* Monto total de la compra. Lo guardamos en caso que en un futuro se modifiquen los precios de los productos */
   total: {
    type: DataTypes.INTEGER
   },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
   }

});

Purchase.belongsTo(Customer);
Purchase.belongsTo(Product);


export default Purchase;