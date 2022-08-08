import { Router } from 'express';
import { PostCustomer, getCustomers, getCustomer } from '../controllers/customers';
import validateFields from '../middlewares/validate-fields';
import {check} from 'express-validator';

const router = Router();

router.get('/', [], getCustomers);

router.get('/:id', [], getCustomer);

router.post('/', [
    check('name', 'You must provide a name to sign up').not().isEmpty(),
    check('email', 'You must provide a valid email address to sign up').isEmail(),
    check('card', 'You must provide a debit/credit card to sign up').isNumeric(),
    validateFields
], PostCustomer);


export default router;