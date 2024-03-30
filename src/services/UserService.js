import User from "../models/user-model.js";


export const getUsersService = async ()=>{
    return await User.find()
}

export const createUserService= async (user)=>{
    return await User.create(user)
}

export const findOneUserService = async (email)=>{
    const user = await User.findOne({ email: email });
    return user
}

export const findUserByIdService = async (id) =>{
    const user = await User.findById(id)
    return user
}

export const updateUserService = async (id,user) =>{
    return await User.findByIdAndUpdate(id, user, {new:true})

}
export const deleteUserService = async (id) =>{
    await User.findByIdAndDelete(id)

}
