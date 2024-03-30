import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false // Define o valor padrão como false
    }
});

const User = model('User', userSchema);

export default User;
