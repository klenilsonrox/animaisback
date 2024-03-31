import Pet from "../models/pet.model.js";
import { createPetService, getPetsService,findPetByUserRefService, findpetByIdService, updatePetService, deletePetService } from "../services/PetServices.js";



export const getAllPets = async (req,res)=>{
  
    try{
       const pets = await getPetsService()

       pets.map(item=>{
        if(item.image===""){
            item.image==="https://centralcabos.vteximg.com.br/arquivos/ids/159950-400-400/produto_sem_foto.gif?v=635922653155000000"
        }
       })

        return res.status(200).json(pets)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const getPetByUserRef = async (req,res)=>{
    const {userRef}=req.params
    try{
       const pets = await findPetByUserRefService(userRef)
        return res.status(200).json(pets)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const getPetById = async (req,res)=>{
    const {id} =req.params
    try{
       const pet = await Pet.findById(id)
       if(!pet){
        return res.status(404).json({message:"Pet não encontrado"})
       }
        return res.status(200).json(pet)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}



export const createPet = async (req, res) => {
   
    const { name, image, sexo,idade, categoria, userRef } = req.body;
    try {
        const novoPet = { name, image, sexo,idade, categoria, userRef};
        await createPetService(novoPet)
        return res.status(201).json({ novoPet, message: "Pet cadastrado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const updatePet = async (req, res) => {
    const { name, image, idade, sexo, categoria } = req.body;
    const { id } = req.params;
    const authUserId = req.user.userId;

    try {
        // Encontre o pet pelo ID
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }

        console.log(pet.userRef)
        console.log(id)

        if (pet.userRef !== authUserId) {
            return res.status(403).json({ message: "Você não tem permissão para atualizar o pet de outro usuário" });
        }

        pet.name = name;
        pet.image = image;
        pet.idade = idade;
        pet.sexo = sexo;
        pet.categoria = categoria;

        await pet.save();

        return res.status(200).json({ pet, message: "Pet atualizado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





export const deletePet = async (req, res) => {
    const { id } = req.params;
    const authUserId = req.user.userId;

    try {
        // Encontre o pet pelo ID
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }

        console.log(pet.userRef)
        console.log(authUserId)

        if (pet.userRef !== authUserId) {
            return res.status(403).json({ message: "Você não tem permissão para deletar o pet de outro usuário" });
        }

        await deletePetService(id);

        return res.status(200).json({ message: "Pet deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
