import {
    config
} from 'dotenv';
import jwt from 'jsonwebtoken';
config()

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Token de autorização não fornecido'
        });
    }

    const token = authHeader.split(' ')[1];


    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Token de autorização inválido'
            });
        }


        req.user = decoded;

        next();
    });
};