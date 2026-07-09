import User from "../models/user.js";
import Business from "../models/business.js";
import Time from "../models/ReservationTime.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordIsCorrect) {
        const error = new Error("Email ou senha inválidos");
        error.statusCode = 401;
        throw error;
      }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    )


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

}

// Business Register

const registerBusiness = async (data) => {
    const { NameSocyte, Address, ContactPhoneNumber, OpenAirOrCovered, daysOfOperation, playingTime, hourlyRate, paymentMethods, cancellationPolicy, UsagePolicy, ItHasChangingRoomsAndASnackBar } = data;

    if (!NameSocyte || !Address || !ContactPhoneNumber || !OpenAirOrCovered || !daysOfOperation || !playingTime || !hourlyRate || !paymentMethods || !cancellationPolicy || !UsagePolicy || !ItHasChangingRoomsAndASnackBar) {
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
        OpenAirOrCovered: business.OpenAirOrCovered,
        daysOfOperation: business.daysOfOperation,
        playingTime: business.playingTime,
        hourlyRate: business.hourlyRate,
        paymentMethods: business.paymentMethods,
        cancellationPolicy: business.cancellationPolicy,
        UsagePolicy: business.UsagePolicy,
        ItHasChangingRoomsAndASnackBar: business.ItHasChangingRoomsAndASnackBar

    }

}

// Time Register

const registerTime = async (data) => {
    const { date, startTime, endTime, NameOfPersonInCharge, amountPayable } = data;

    if (!date || !startTime || !endTime || !NameOfPersonInCharge || !amountPayable) {
        throw new Error("Name, email, and password are required.")
    }

    const timeExists = await Time.findOne({ date });

    if (timeExists) {
        throw new Error("A time with this date already exists.")
    }


    const time = await Time.create({

        date,
        startTime,
        endTime,
        NameOfPersonInCharge, 
        amountPayable

    });

    return {

        date: time.date,
        startTime: time.startTime,
        endTime: time.endTime,
        NameOfPersonInCharge: time.NameOfPersonInCharge,
        amountPayable: time.amountPayable

    }

};


export default {
    login,
    register,
    registerBusiness,
    registerTime
}