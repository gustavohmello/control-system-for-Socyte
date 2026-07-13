import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";







dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user",userRoutes);
app.use("/time", timeRoutes);
app.use("/business", businessRoutes);




const startServer = async () => {
    try {
        await conectDB();

        app.listen(PORT, () => {
            console.log(  `Servidor esta rodando na porta ${PORT}`);
        });
    }catch (error) {
        console.log("ERRO ao iniciar o servidor:", error.message);
    }
};
  
startServer();  