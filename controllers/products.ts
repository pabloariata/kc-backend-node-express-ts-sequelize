import { Request, Response } from "express";
import Product from '../models/product';

/* Obtener los productos en la DB */
export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll();

        res.json({
            ok: true,
            products
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }



}