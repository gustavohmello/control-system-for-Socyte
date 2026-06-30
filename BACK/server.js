import express from "express";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensage: "API de loja do Banco funcionando " })
});

app.use("/auth", authRoutes);


const startServer = async () => {
    try {
        await conectDB();

        app.listen(PORT, () => {
            console.log(  `Servidor esta rodando na porta ${PORT}`);
        });
    }catch (error) {
        console.log("ERRO ao iniciar o servidor:", error.menssage);
    }
};
  
startServer();  