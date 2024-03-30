import Pet from "../models/pet.model.js";


export const findPetByUserRefService = async (userRef)=>{
    const pets =  await Pet.find({ userRef: userRef });
    return pets
}


export const findpetByIdService = async (id)=>{
    return await Pet.findById(id)
    
 }

export const getPetsService = async ()=>{
    const pets = await Pet.find()
    return pets
}

export const createPetService = async (newPet)=>{
    const pet = await Pet.create(newPet)
    return pet
}


export const updatePetService = async (id,pet)=>{
    return await Pet.findByIdAndUpdate(id,pet,{new:true})
    
 }


 export const deletePetService = async (id)=>{
    return await Pet.findByIdAndDelete(id)
    
 }


