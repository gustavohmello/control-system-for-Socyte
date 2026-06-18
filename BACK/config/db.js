import mongoose from "mongoose";

const conectDB = async () => {
    if (!process.env.MONGO_URI){
        throw new Error("MONGO_URI: não foi encontrado no arquivo .env ");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("conectado com o MongoDB");
};

export default conectDB;