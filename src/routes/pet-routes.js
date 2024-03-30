import { Router } from "express";
import { createPet, deletePet, getAllPets, getPetById, getPetByUserRef, updatePet } from "../controllers/PetController.js";
import { auth } from "../middleware/auth.js";



const router = Router()

router.get("/pets", getAllPets)
router.post("/pets", auth, createPet)
router.get("/pets/findone/:id", getPetById)
router.get("/pets/:userRef",auth, getPetByUserRef)
router.put("/pets/:id",auth, updatePet)
router.delete("/pets/:id",auth, deletePet)



export default router