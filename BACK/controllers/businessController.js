import bussinesServices from "../services/bussinesServices.js";



const registerBusiness = async (req,res,next) => {
    try{
        const business = await bussinesServices.registerBusiness(req.body);

        res.status(201).json({
            menssage: "Business register sucessful",
            data: business,
        })
    }catch (error){
        next(error)
    }
}


const listBusiness = async (req, res, next) => {
    try {
        const business = await  bussinesServices.listBusiness();
        res.json({ business })
    } catch (error) {
        next(error);
    }
}

const updateBusiness = async (req, res, next) => {
    try {
        const business = await bussinesServices.updateBusiness(req.params.id, req.body)
        res.json(business)
    } catch (error) {
        next(error);
    }

}

const deleteBusiness = async (req, res, next) => {
    try{
        const business = await bussinesServices.deleteBusiness(req.params.id)
        res.json({message: "Business deleted",business})

    }catch(error){
        next(error);
    }

}

export default {
    listBusiness,
    updateBusiness,
    deleteBusiness,
    registerBusiness

};