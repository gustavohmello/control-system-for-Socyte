import Business from "../models/business.js";
import User from "../models/user.js"
import Time from "../models/ReservationTime.js"

// Business

const listBusiness = async () => {
    return Business.find();
}

const updateBusiness = async (id, data) => {
    const business = await Business.findByIdAndUpdate(id, data, {
        returnDocument : 'after',
        runValidators: true,

    });

    if(!business){
        const error = new Error("Business not find");
        error.statusCode = 404;
        throw error;
    }

    return business;

}

const deleteBusiness = async(id)=>{
    const deleteBusiness = await Business.countDocuments({
        active: true,
        _id: id
    })
    if(deleteBusiness> 0){
        const error = new Error ("It is not possible to delete a active Business");
        error.statusCode = 400;
        throw error;
    }
    const business = await Business.findByIdAndDelete(id);

    if (!business) {
        const error = new Error("Business not found");
        error.statusCode = 404;
        throw error;
    }
    return business
}

// User

const listUser = async () => {
    return User.find();
}


const updateUser = async (id, data) => {

    const user = await User.findByIdAndUpdate(id, data, {
        returnDocument: 'after',
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

// Time


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




export default {
    listBusiness,
    updateBusiness,
    deleteBusiness,
    listUser,
    updateUser,
    userDelet,
    updateTime,
    timeDelet

}
