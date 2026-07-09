import Time from "../models/ReservationTime.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

// Time

const listTime = async () => {
    return Time.find();
}


const updateTime = async (id) => {

    const user = await User.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true,
    });

    if (!user) {
        const error = new Error("Time not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const timeDelet = async (id) => {

    const deleteTime = await Time.countDocuments({_id: id });

    if (deleteTime > 0 ){
        const error = new Error ("It is not possible to delete a time who has an active account.");
        error.statusCode = 400;
        throw error;
    }

    const time = await Time.findByIdAndDelete(id);

    if (!time) {
        const error = new Error("Time not found");
        error.statusCode = 404;
        throw error;
    }
    return time
}

// Day

const getDay = async (Day) => {
    
    const day = await Time.find({date: Day});

    return day
}

export default {

    registerTime,
    updateTime,
    timeDelet,
    listTime,
    getDay
    

}