import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(

    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },

        Email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },

        Telephone: {
            type: String, 
            trim: true,
            unique: true,
        },

        CPF: {
            type: Number,
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