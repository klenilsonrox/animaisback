
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/user-model.js';
config();



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }
       
        // Se as credenciais estiverem corretas, gere o token JWT com o ID do usuário
        const token =await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

        // Retorne o token JWT junto com o id e o nome do usuário
        res.status(200).json({
            token,
            id: user._id,
            name: user.name,
            isAdmin:user.isAdmin
        });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
