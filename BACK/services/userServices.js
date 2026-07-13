import User from "../models/user.js";

// User

const listUser = async () => {
  return User.find();
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  const exists = await User.findOne({
    $or: [{ Email }, { CPF }, { Telephone }],
  });

  if(exists){
    const error = new Error("User with this Email, CPF or Telephone alredy exists");
    error.statusCode = 409;
    throw error;
  }

  return user;
};

const userDelet = async (id) => {
  const deleteUser = await User.countDocuments({ id: _id, active: true });

  if (deleteUser > 0) {
    const error = new Error(
      "It is not possible to delete a user who has an active account.",
    );
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
};

export default {
  listUser,
  updateUser,
  userDelet,
};
