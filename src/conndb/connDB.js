import { config } from "dotenv";
import mongoose from "mongoose";

config()

const mongoUrl=`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@adocaodeanimais.4szu5tr.mongodb.net/`


export const connectDB = async()=>{
    try{
        await mongoose.connect(mongoUrl)
        console.log("conectado ao mongodb com sucesso")
    }catch(error){
        console.log(error)
    }
}