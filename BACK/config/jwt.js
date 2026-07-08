import jwt from "jsonwebtoken"

const jwt = req("jsonwebtoken");

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario._id,
      role: usuario.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

export default gerarToken