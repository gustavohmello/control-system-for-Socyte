import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (dataUser) => {
    const { Name, Email,CPF, Telephone,Idade} = dataUser;
    return User.create({Name, Email,CPF,Telephone,Idade});
}

const listUser = async () => {
    return User.find();
}


const updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id,data, {
        returnDocument : 'after',
        runValidators: true,
    });

    if (!user) {
        const error = new Error("Usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;      
}

const userDelet = async (id) => {
    const deleteUser = await User.countDocuments({userId: id });

    if (deleteUser > 0 ){
        const error = new Error ("Não é possivel deletar um usuario que possui uma conta 'ativa'");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        const error = new Error("usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }
    return user
}

const login = async (data) => {
    const { Email, password } = data;

    if (!Email || !password) {

        throw new Error("Email e senha são obrigatorios")

    }

    const user = await User.findOne({ Email }).select("+password");

   

    if (!user) {
        throw new Error("Email or passord invalid");
    }

    if (user.Ativo === false) {
        throw new Error("User is deactivated");
    }


    const passordIsCorrect = await bcrypt.compare(password, user.password);

    console.log(passordIsCorrect)
    if (!passordIsCorrect) {
        throw new Error("Password invalid");
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
    console.log(process.env.JWT_SECRET)

    return {
        user: {
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            Telephone: user.Telephone,
            role: user.role,
            ativo:user.true,

        },
        token,

    };

}






export default {
    createUser,
    listUser,
    updateUser,
    userDelet,
    login
}