import authServices from "../services/authServices.js"

const createUser = async (req,res, next) => {

    try{
    const user =  await authServices.createUser(req.body);
    res.status(201).json(user)
    } catch (error){
        next(error);
    }

};

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
        res.json({ menssage: "Usuario deletado com sucesso", user});
    }catch (error){
        next(error);
    }
}

const login = async (req,res,next) => {
    try{
        const result = await authServices.login(req.body);

        res.status(200).json({
            menssage: "login realizado com sucesso",
            data: result,

        })
    }catch (error) {
        next(error);
    }
}


export default {    
    createUser,
    listUser,
    updateUser,
    userDelet,
    login
};