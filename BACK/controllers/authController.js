import authServices from "../services/authServices.js"

// Auth User controllers

const register = async (req,res,next) => {
    try{
        const user = await authServices.register(req.body);

        res.status(201).json({
            menssage: "User register sucessful",
            deta: user,
        })
    }catch (error){
        next(error)
    }
}



const login = async (req,res,next) => {
    try{
        const result = await authServices.login(req.body);

        res.status(200).json({
            menssage: "Login successful",
            data: result,

        })
    }catch (error) {
        next(error);
    }
}

// Business Register

const registerBusiness = async (req,res,next) => {
    try{
        const business = await authServices.registerBusiness(req.body);

        res.status(201).json({
            menssage: "Business register sucessful",
            data: business,
        })
    }catch (error){
        next(error)
    }
}

// Time Register

const registerTime = async (req,res,next) => {
    try{
        const time = await authServices.registerTime(req.body);

        res.status(201).json({
            menssage: "Time register sucessful",
            data: time,
        })
    }catch (error){
        next(error)
    }
}


export default {    
    login,
    register,
    registerBusiness,
    registerTime
};