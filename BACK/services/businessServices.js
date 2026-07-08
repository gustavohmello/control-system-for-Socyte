import Business from "../models/business.js";

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
    deleteBusiness

}
