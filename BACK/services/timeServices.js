import Time from "../models/ReservationTime.js"
import Business from "../models/business.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Time Register

const registerTime = async (data) => {
    const {businessId, date, startTime, endTime, nameOfPersonInCharge, amountPayable } = data;

    if (!businessId, !date || !startTime || !endTime || !nameOfPersonInCharge || !amountPayable) {
        throw new Error("Name, email, and password are required.")
    }

  const conflictingEvent = await Time.findOne({
        businessId,
        date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    });

    if (conflictingEvent) {
        const error = new Error("Este horário já está reservado para esta quadra.");
        error.statusCode = 409;
        throw error;
    }


    const time = await Time.create({

          businessId,
        date,
        startTime,
        endTime,
        nameOfPersonInCharge, 
        amountPayable

    });

    return {
         businessId: time.businessId,
        date: time.date,
        startTime: time.startTime,
        endTime: time.endTime,
        nameOfPersonInCharge: time.NameOfPersonInCharge,
        amountPayable: time.amountPayable

    }

};

// Time

const listTime = async () => {
    return Time.find();
}


const updateTime = async (id,data) => {

    const time = await Time.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true,
    });

    if (!time) {
        const error = new Error("Time not found");
        error.statusCode = 404;
        throw error;
    }

    return time;
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