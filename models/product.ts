/* Product DB Model */

import { DataTypes } from 'sequelize';
import db from '../db/db';

const Product = db.define('Product', {

   name: {
    type: DataTypes.STRING
   },
   price: {
    type: DataTypes.FLOAT,
   },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
   }

});


export default Product;