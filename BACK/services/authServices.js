import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Auth services

const register = async (data) => {
  const { Name, Email, CPF, Telephone, password, role } = data;

  if (!Name || !Email || !password || !Telephone || !CPF) {
    throw new Error("Name, email, CPF, Telephone and password are required.");
  }

  

  const userExists = await User.findOne({
  $or: [
    { Email },
    { CPF },
    { Telephone }
  ]
});

  if (userExists) {
    throw new Error("A user with this email,CPF or Telephone already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    Name,
    Email,
    CPF,
    password: hashedPassword,
    Telephone,
    role: role || "user",
    Active: true,
  });

  return {
    _id: user._id,
    Name: user.Name,
    Email: user.Email,
    CPF: user.CPF,
    Telephone: user.Telephone,
    password: user.password,
    role: user.role,
    Active: user.Active,
  };
};

const login = async (data) => {
  const { Email, password } = data;

  if (!Email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ Email }).select("+password");

  if (!user) {
    throw new Error("Email or passord invalid");
  }

  if (user.Active === false) {
    throw new Error("User is deactivated");
  }

  const passwordIsCorrect = bcrypt.compareSync(password, user.password);

  if (!passwordIsCorrect) {
    const error = new Error("Email ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );

  return {
    user: {
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      Telephone: user.Telephone,
      CPF: user.CPF,
      role: user.role,
      Active: user.Active,
    },
    token,
  };
};

export default {
  login,
  register,
};
