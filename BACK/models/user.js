import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        telephone: {
            type: String, 
            required: true,
            trim: true,
            unique: true,
        },

        CPF: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },

    
        active: {  
            type: Boolean,
            default: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
            trim: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    }
);

export default mongoose.model("User", UserSchema);