import dashboardSevices from "../services/dashboardSevices.js";

const dashboard = async (req, res, next) => {
    try {

        const data = await dashboardSevices.dashboard();

        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}



const userDashboard = async (req, res, next) => {
    try {

        const data = await dashboardSevices.userDashboard(req.params.id);

        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}

export default {
    dashboard,
    userDashboard
};