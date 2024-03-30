import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, updateUserRole } from "../controllers/UserController.js";
import { auth } from "../middleware/auth.js";
import { login } from "../controllers/AuthController.js";



const router = Router()


router.post("/users", createUser)
router.post("login",login)
router.get("/users", auth, getAllUsers)
router.get("/users/:id", getUserById)
router.put("/users/:id", auth, updateUser)
router.put("/users/admin/:id", auth, updateUserRole)
router.delete("/users/:id",auth, deleteUser)




export default router