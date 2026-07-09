import timeServices from "../services/timeServices.js";

// Time Register

const registerTime = async (req,res,next) => {
    try{
        const time = await timeServices.registerTime(req.body);

        res.status(201).json({
            menssage: "Time register sucessful",
            data: time,
        })
    }catch (error){
        next(error)
    }
}


const listTime = async (req,res,next) => {
    try {
        const time = await timeServices.listTime();
        res.json(time); 
    }catch (error){  
        next(error);
    }
};

const updateTime = async (req,res,next) => {
    try{
        const user = await timeServices.updateTime(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};
 
const timeDelet = async (req,res,next) => {
    try{
        const time = await timeServices.timeDelet(req.params.id);
        res.json({ menssage: "time successfully deleted ", time});
    }catch (error){
        next(error);
    }
}

const getDay = async (req, res, next) => {
    try{
        const day = await timeServices.getDay(req.params.day);
        res.json({day});
    } catch (error){
       next(error);
    }
}


export default {

    updateTime,
    timeDelet,
    listTime,
    getDay,
    registerTime
}