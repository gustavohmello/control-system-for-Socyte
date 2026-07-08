import User from "../models/user.js";
import Business from "../models/business.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const listUser = async () => {
    return User.find();
}


const updateUser = async (id, data) => {
    
    const user = await User.findByIdAndUpdate(id,data, {
        
        returnDocument : 'after',
        runValidators: true,
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;      
}

const userDelet = async (id) => {
    const deleteUser = await User.countDocuments({_id: id });

    if (deleteUser > 0 ){
        const error = new Error ("It is not possible to delete a user who has an active account.");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user
}


// Auth services

const register = async (data) => {
    const { Name, Email, CPF, Telephone, password, role } = data;

    if (!Name || !Email || !password) {
        throw new Error("Name, email, and password are required.")
    }

    const userExists = await User.findOne({ Email });

    if (userExists) {
        throw new Error("A user with this email already exists.")
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        Name,
        Email,
        CPF,
        password: hashedPassword,
        Telephone,
        password,
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
    }

}



const login = async (data) => {
    const { Email, password } = data;

    if (!Email || !password) {

        throw new Error("Email and password are required")
      

    }

    const user = await User.findOne({ Email }).select("+password");


    if (!user) {
        throw new Error("Email or passord invalid");
    }
    
    if (user.Active === false) {
        throw new Error("User is deactivated");
    }


    const passordIsCorrect = bcrypt.compare(password, user.password);

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
            password: user.password,
            CPF: user.CPF,
            role: user.role,
            Active:user.Active,

        },
        token,

    };

}

// Business Register

const registerBusiness = async (data) => {
    const { NameSocyte, Address, ContactPhoneNumber, OpenAirOrCovered ,daysOfOperation,  playingTime, hourlyRate,paymentMethods, cancellationPolicy,  UsagePolicy, ItHasChangingRoomsAndASnackBar } = data;

    if (!NameSocyte|| !Address || !ContactPhoneNumber || ! OpenAirOrCovered || !daysOfOperation || ! playingTime || !hourlyRate ||! paymentMethods || !cancellationPolicy || !UsagePolicy || !ItHasChangingRoomsAndASnackBar) {
        throw new Error("Name, email, and password are required.")
    }

    const businessExists = await Business.findOne({ Address });

    if (businessExists) {
        throw new Error("A business with this sddress already exists.")
    }


    const business = await Business.create({
        NameSocyte,
        Address,
        ContactPhoneNumber,
        OpenAirOrCovered,
        daysOfOperation,
        playingTime,
        hourlyRate,
        paymentMethods,
        cancellationPolicy,
        UsagePolicy,
        ItHasChangingRoomsAndASnackBar,
    });

    return {
       
        NameSocyte: business.NameSocyte,
        Address: business.Address,
        ContactPhoneNumber: business.ContactPhoneNumber,
        OpenAirOrCovered:business.OpenAirOrCovered,
        daysOfOperation: business.daysOfOperation,
        playingTime: business.playingTime,
        hourlyRate: business.hourlyRate,
        paymentMethods: business.paymentMethods,
        cancellationPolicy: business.cancellationPolicy,
        UsagePolicy: business.UsagePolicy,
        ItHasChangingRoomsAndASnackBar: business.ItHasChangingRoomsAndASnackBar

    }

}



export default {
    listUser,
    updateUser,
    userDelet,
    login,
    register,
    registerBusiness
}