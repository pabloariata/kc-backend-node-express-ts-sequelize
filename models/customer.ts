/* Customer DB Model */

import { DataTypes } from 'sequelize';
import db from '../db/db';

const Customer = db.define('Customer', {

   name: {
    type: DataTypes.STRING
   },
   email: {
    type: DataTypes.STRING
   },
   card: {
    type: DataTypes.STRING
   },
   password: {
    type: DataTypes.STRING
   },
   /* Valor acumulado de la wallet del cliente, por default en 0 */
   wallet: {
    type: DataTypes.FLOAT,
    defaultValue: 0
   },
   /* Para realizar borrado lógico */
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1
   }

});


export default Customer;