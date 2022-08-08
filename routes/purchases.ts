import { Router } from 'express';
import { getPurchases, getPurchasesFromCustomer, postPurchase } from '../controllers/purchases';


const router = Router();

router.get('/', [], getPurchases);

router.get('/:id', [], getPurchasesFromCustomer);

router.post('/', [

], postPurchase);


export default router;