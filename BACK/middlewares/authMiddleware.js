const jwt = req("jsonwebtoken");
const User = req("../models/User");

// Verifica se o usuário está autenticado (RF02 / rotas protegidas)
async function autenticar(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await User.findById(payload.id);

    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    // RN04 - usuário inadimplente/bloqueado não pode fazer novas reservas
    if (!usuario.ativo) {
      return res.status(403).json({ erro: "Usuário bloqueado. Regularize seus pagamentos." });
    }

    req.usuario = usuario; // disponibiliza o usuário logado para as próximas etapas
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}

// Verifica se o usuário autenticado é admin (RN07)
function somenteAdmin(req, res, next) {
  if (req.usuario.role !== "admin") {
    return res.status(403).json({ erro: "Acesso restrito ao administrador" });
  }
  next();

}


export default { 
  autenticar, 
  somenteAdmin 
 };
