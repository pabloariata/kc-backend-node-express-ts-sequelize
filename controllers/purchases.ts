import { Request, Response } from "express";
import Customer from "../models/customer";
import Product from "../models/product";
import Purchase from '../models/purchase';
import { updateWallet } from "./customers";

/* Obtener las compras en la DB */
export const getPurchases = async (req: Request, res: Response) => {

    try {
        const purchases = await Purchase.findAll();

        res.json({
            ok: true,
            purchases
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }



}

/* Obtener las compras en la DB de un customer */
export const getPurchasesFromCustomer = async (req: Request, res: Response) => {

    try {

        /* id del customer a buscar sus purchases */
        const { id } = req.params;

        /* Buscamos las compras del customer con el id recibido como parámetro */
        const purchases = await Purchase.findAll({
            where: {
                CustomerId: id
            },
            include: {
                model: Product
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        });

        res.json({
            ok: true,
            id,
            purchases
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }



}

export const postPurchase = async (req: Request, res: Response) => {

    // TODO: transaction para modificar monto en wallet luego de compra??

    try {

        const { CustomerId, ProductId, quantity } = req.body;

        const product = await Product.findByPk(ProductId);

        if(!product) {
            return res.status(400).json({
                ok: false,
                msg: "there is no product with that id"
            })
        }

        /* Calculamos el precio total */
        const unitPrice = product?.getDataValue('price');
        const total = unitPrice*quantity;
        const cashback = total/10000;

        /* Actualizamos la wallet del customer que realizo la transacción */
        const customer = await updateWallet(CustomerId, cashback);

        /* Creamos el purchase */
        const purchase = Purchase.build({
            CustomerId,
            ProductId,
            quantity,
            total,

        });

        /* Grabamos en DB */
        await purchase.save();

        res.json({
            ok: true,
            customer,
            product,
            purchase,
            wallet: customer?.getDataValue('wallet')
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        });

    }



}

