import updateAndDeletServices from "../services/updateAndDeletServices.js"


// Business

const listBusiness = async (req, res, next) => {
    try {
        const business = await updateAndDeletServices.listBusiness();
        res.json({ business })
    } catch (error) {
        next(error);
    }
}

const updateBusiness = async (req, res, next) => {
    try {
        const business = await updateAndDeletServices.updateBusiness(req.params.id, req.body)
        res.json(business)
    } catch (error) {
        next(error);
    }

}

const deleteBusiness = async (req, res, next) => {
    try{
        const business = await updateAndDeletServices.deleteBusiness(req.params.id)
        res.json({message: "Business deleted",business})

    }catch(error){
        next(error);
    }

}

// User

const listUser = async (req,res,next) => {
    try {
        const user = await updateAndDeletServices.listUser();
        res.json(user); 
    }catch (error){  
        next(error);
    }
};

const updateUser = async (req,res,next) => {
    try{
        const user = await updateAndDeletServices.updateUser(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};

const userDelet = async (req,res,next) => {
    try{
        const user = await updateAndDeletServices.userDelet(req.params.id);
        res.json({ menssage: "User successfully deleted ", user});
    }catch (error){
        next(error);
    }
}

//  Time

const listTime = async (req,res,next) => {
    try {
        const time = await updateAndDeletServices.listTime();
        res.json(time); 
    }catch (error){  
        next(error);
    }
};

const updateTime = async (req,res,next) => {
    try{
        const user = await updateAndDeletServices.updateTime(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};
 
const timeDelet = async (req,res,next) => {
    try{
        const user = await updateAndDeletServices.timeDelet(req.params.id);
        res.json({ menssage: "time successfully deleted ", time});
    }catch (error){
        next(error);
    }
}


export default {
    listBusiness,
    updateBusiness,
    deleteBusiness,
    listUser,
    updateUser,
    userDelet,
    updateTime,
    timeDelet,
    listTime
}