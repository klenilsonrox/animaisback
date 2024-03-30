import { Schema, model } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
    },
    image:{
        type:String
    },
    idade:{
        type:String
    },
    sexo:{
        type:String
    },
    categoria:{
        type:String
    },
    userRef:{
        type:String,
        required:true
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

const Pet = model('Pet', petSchema);

export default Pet;
