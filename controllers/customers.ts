import { Request, Response } from "express";
import { encriptar } from "../helpers/crypto";
import Customer from '../models/customer';
import  bcrypt  from 'bcrypt';

/* Obtener todos los customers */
export const getCustomers = async (req: Request, res: Response) => {

    try {

        const customers = await Customer.findAll();

        res.status(200).json({
            ok: true,
            msg: 'getCustomers',
            customers
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })

    }



}

/* Obtener customer por ID */
export const getCustomer = async (req: Request, res: Response) => {

    /* Obtenemos el id de la petición */
    const { id } = req.params;

    try {

        /* Obtenemos el customer de la base de datos */
        const customer = await Customer.findByPk(id);

        /* Si no existe, devolvemos un 404 */
        if (!customer) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un usuario con el id ${id}`
            })
        }

        /* Si existe, devolvemos el customer solicitado */
        res.status(200).json({
            ok: true,
            customer
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })

    }


}

/* Creación de customer */
export const PostCustomer = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        /* Creamos el modelo de customer con los datos del request */
        const newCustomer = Customer.build(body);

        /* Encriptamos el password del usuario con Bcrypt para encriptar en una sola via */
        const salt = bcrypt.genSaltSync();
        const password = body.password;
        const passwordEncrypt = bcrypt.hashSync(password, salt);
        newCustomer.setDataValue('password', passwordEncrypt);

        /* Encriptamos la tarjeta del customer con AES-256 */
        const card = body.card;
        const cardEncrypt = encriptar(card);
        newCustomer.setDataValue('card', cardEncrypt);

        /* Guardado en DB */
        await newCustomer.save();

        /* Respuesta al front-end */
        res.status(200).json({
            ok: true,
            msg: 'postCustomers',
            body,
            newCustomer
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
    }




}

export const updateWallet = async (customerId: string, cashback: number) => {

        try {
            const customer = await Customer.findByPk(customerId);

            const oldWallet = customer?.getDataValue('wallet');
            const updatedWallet = oldWallet + cashback;

            customer?.setDataValue('wallet', updatedWallet);

            await customer?.save();

            return customer;

        } catch (error) {
            console.log(error)

        }


}