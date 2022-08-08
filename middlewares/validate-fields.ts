import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

/* Validamos si el express-validator detecto algun error en la petición */
const validateFields = (req: Request, res: Response, next: VoidFunction) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }

    next();

}

export default validateFields;