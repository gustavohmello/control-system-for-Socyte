import businessServices from "../services/businessServices.js"
import Business from "../models/business.js"
import authServices from "../services/authServices.js";

const listBusiness = async (req, res, next) => {
    try {
        const business = await businessServices.listBusiness();
        res.json({ business })
    } catch (error) {
        next(error);
    }
}

const updateBusiness = async (req, res, next) => {
    try {
        const business = await businessServices.updateBusiness(req.params.id, req.body)
        res.json(business)
    } catch (error) {
        next(error);
    }

}

const deleteBusiness = async (req, res, next) => {
    try{
        const business = await businessServices.deleteBusiness(req.params.id)
        res.json({message: "Business deleted",business})

    }catch(error){
        next(error);
    }

}




export default {
    listBusiness,
    updateBusiness,
    deleteBusiness
}