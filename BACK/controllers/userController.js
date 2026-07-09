import userServices from "../services/userServices.js"




// User

const listUser = async (req,res,next) => {
    try {
        const user = await userServices.listUser();
        res.json(user); 
    }catch (error){  
        next(error);
    }
};

const updateUser = async (req,res,next) => {
    try{
        const user = await userServices.updateUser(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};

const userDelet = async (req,res,next) => {
    try{
        const user = await userServices.userDelet(req.params.id);
        res.json({ menssage: "User successfully deleted ", user});
    }catch (error){
        next(error);
    }
}


export default {

    listUser,
    updateUser,
    userDelet,
 
}