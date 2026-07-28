import User from "../models/user.js";
import Business from "../models/business.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Auth services

const register = async (data) => {
  const { name, email, CPF, telephone, password, role } = data;

  if (!name || !email || !password || !telephone || !CPF) {
    throw new Error("Name, email, CPF, Telephone and password are required.");
  }



  const userExists = await User.findOne({
    $or: [
      { email },
      { CPF },
      { telephone }
    ]
  });

  if (userExists) {
    throw new Error("A user with this email,CPF or Telephone already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    CPF,
    password: hashedPassword,
    telephone,
    role: role || "user",
    active: true,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    CPF: user.CPF,
    telephone: user.telephone,
    password: user.password,
    role: user.role,
    active: user.active,
  };
};

const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");



  if (!user) {
    throw new Error("Email or passord invalid");
  }

  if (user.active === false) {
    throw new Error("User is deactivated");
  }

  const passwordIsCorrect = bcrypt.compareSync(password, user.password);

  if (!passwordIsCorrect) {
    const error = new Error("Email ou senha inválidos");
    error.statusCode = 401;
    throw error;
  }

  const business = await Business.findOne({
    $or: [{ ownerID: user._id }, { workersID: user._id }],
  });

  if (!business) {
    throw new Error("This user is not registered with any business ");

  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      businessID: business._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      CPF: user.CPF,
      role: user.role,
      active: user.active,
    },
    business: {
      ownerID: business.ownerID,
      workersID: business.workersID,
      nameSocyte: business.nameSocyte,
      address: business.address,
      contactPhoneNumber: business.contactPhoneNumber,
      openAirOrCovered: business.contactPhoneNumber,
      daysOfOperation: business.daysOfOperation,
      hourlyRate: business.hourlyRate,
      paymentMethods: business.paymentMethods,
      cancellationPolicy: business.cancellationPolicy,
      usagePolicy: business.usagePolicy,
      itHasChangingRoomsAndASnackBar: business.itHasChangingRoomsAndASnackBar



    },
    token,
  };
};

export default {
  login,
  register,
};
