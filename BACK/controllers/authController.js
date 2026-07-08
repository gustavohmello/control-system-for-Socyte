import authServices from "../services/authServices.js"


// Não estão sendo usadas ainda !

const listUser = async (req,res,next) => {
    try {
        const user = await authServices.listUser();
        res.json(user); 
    }catch (error){  
        next(error);
    }
};

const updateUser = async (req,res,next) => {
    try{
        const user = await authServices.updateUser(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};

const userDelet = async (req,res,next) => {
    try{
        const user = await authServices.userDelet(req.params.id);
        res.json({ menssage: "User successfully deleted ", user});
    }catch (error){
        next(error);
    }
}

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
            deta: business,
        })
    }catch (error){
        next(error)
    }
}



export default {    
    listUser,
    updateUser,
    userDelet,
    login,
    register,
    registerBusiness
};