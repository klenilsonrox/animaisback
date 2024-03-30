import User from "../models/user-model.js";
import {
    createUserService,
    deleteUserService,
    findOneUserService,
    findUserByIdService,
    getUsersService,
    updateUserService
} from "../services/UserService.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const getAllUsers = async (req, res) => {
    try {
        const users = await getUsersService();

        const usersWithoutPassword = users.map(user => {
            const {
                password,
                ...userWithoutPassword
            } = user.toObject()
            return userWithoutPassword;
        });

        return res.status(200).json(usersWithoutPassword);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};



export const getUserById = async (req, res) => {
    const {
        id
    } = req.params

    try {

        const userExist = await findUserByIdService(id)
       
        if (!userExist) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

        const { password, ...userWithoutPassword } = userExist.toObject();

        return res.status(200).json(userWithoutPassword)

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}



export const createUser = async (req, res) => {
    const {
        name,
        email,
        password,
        cidade,
        whatsapp
    } = req.body;
    try {

        const userExist =await findOneUserService(email)

        if (userExist) {
            return res.status(401).json({
                message: "Já existe um usuário cadastrado com esse email"
            });
        }

       else if(!name){
            return res.status(401).json({message:"O Nome é obrigatório"})
        }


       else if(!email){
            return res.status(401).json({message:"O Email é obrigatório"})
        }

        else if(!cidade){
            return res.status(401).json({message:"A cidade é obrigatório"})
        }

        else if(!whatsapp){
            return res.status(401).json({message:"O whatsapp é obrigatório"})
        }

        else if(password===""){
            return res.status(401).json({message:"A Senha é obrigatória"})
        }


        const hashPass = await bcrypt.hash(password, 10); // Hash da senha usando bcrypt

        const newUser = {
            name,
            email,
            password: hashPass ,
            cidade,
            whatsapp
        };

        

        const usercriado = await createUserService(newUser);

        const token =await jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '3d' });

        delete newUser.password;

        return res.status(201).json({
            token,
            id:usercriado._id,
            isAdmin:usercriado.isAdmin,
            name:usercriado.name
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};




export const updateUser = async (req, res) => {
    const { id: userId } = req.params;

    try {
        if (userId !== req.user.userId) {
            return res.status(403).json({ message: "Você não tem permissão para atualizar os dados de outro usuário" });
        }


        const userExist = await findUserByIdService(userId);
       
        if (!userExist) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await updateUserService(userId, req.body);


        return res.status(200).json({message:"Usuário atualizado com sucesso"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const updateUserRole = async (req, res) => {
    const {
        id
    } = req.params

    try {

        const userExist = await findUserByIdService(id)

        console.log(userExist)
       
        if (!userExist) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            })
        }


       await updateUserService(id,req.body)

        return res.status(200).json({message:"usuário atualizado com sucesso!"})

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}



export const deleteUser = async (req, res) => {
    const {
        id
    } = req.params

    try {

        const userExist = await findUserByIdService(id)
       
        if (!userExist) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            })
        }

       await deleteUserService(id)

        return res.status(200).json({message:"usuário deletado com sucesso"})

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}