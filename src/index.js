import express from "express"
import cors from "cors"
import {config} from "dotenv"
import { connectDB } from "./conndb/connDB.js"
import routerUsers from "./routes/user-route.js"
import routerPets from "./routes/pet-routes.js"
import { login } from "./controllers/AuthController.js"


config()

const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())


app.use("/", routerUsers)
app.use("/", routerPets)
app.use("/login", login)

connectDB()


app.listen(PORT || 3333, ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
})