import Business from "../models/business.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Business Register

const registerBusiness = async (data) => {
    const {  ownerID, workersID,nameSocyte, address, contactPhoneNumber, findOnepenAirOrCovered, daysOfOperation, playingTime, hourlyRate, paymentMethods, cancellationPolicy, usagePolicy, itHasChangingRoomsAndASnackBar } = data;

    if (!ownerID || !nameSocyte || !address || !contactPhoneNumber || !openAirOrCovered || !daysOfOperation || !playingTime || !hourlyRate || !paymentMethods || !cancellationPolicy || !usagePolicy || !itHasChangingRoomsAndASnackBar) {
        throw new Error("Name, email, and password are required.")
    }

    const businessExists = await Business.findOne({ address });

    if (businessExists) {
        throw new Error("A business with this sddress already exists.")
    }


    const business = await Business.create({
        ownerID,
        nameSocyte,
        address,
        contactPhoneNumber,
        openAirOrCovered,
        daysOfOperation,
        playingTime,
        hourlyRate,
        paymentMethods,
        cancellationPolicy,
        usagePolicy,
        itHasChangingRoomsAndASnackBar,
    });

    return {
        ownerID: business.ownerID,
        nameSocyte: business.nameSocyte,
        address: business.address,
        contactPhoneNumber: business.contactPhoneNumber,
        openAirOrCovered: business.openAirOrCovered,
        daysOfOperation: business.daysOfOperation,
        playingTime: business.playingTime,
        hourlyRate: business.hourlyRate,
        paymentMethods: business.paymentMethods,
        cancellationPolicy: business.cancellationPolicy,
        usagePolicy: business.usagePolicy,
        itHasChangingRoomsAndASnackBar: business.itHasChangingRoomsAndASnackBar

    }

}



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

export default {
    listBusiness,
    updateBusiness,
    deleteBusiness, 
    registerBusiness


}
