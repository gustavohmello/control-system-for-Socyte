import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({ error: "Token não enviado" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      res.status(401).json({ error: "Token mal formatado" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      res.status(401).json({ error: "Formato de token inválido" });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (!user.Active) {
      return res.status(403).json({ error: "Usuário inativo" });
    }

    req.user = user; /// token invalido ou expirado
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

export default authMiddleware;

  



