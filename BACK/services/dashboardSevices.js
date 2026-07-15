import ReservationTime from "../models/ReservationTime.js";
import Business from "../models/business.js";


const dashboard = async () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    // Reservas de hoje
    const reservationsToday = await ReservationTime.countDocuments({
        date: {
            $gte: today,
            $lt: tomorrow,
        },
    });

    // Total de reservas
    const totalReservations = await ReservationTime.countDocuments();

    // Total arrecadado
    const totalRevenue = await ReservationTime.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amountPayable",
                },
            },
        },
    ]);

    // Arrecadação de hoje
    const revenueToday = await ReservationTime.aggregate([
        {
            $match: {
                date: {
                    $gte: today,
                    $lt: tomorrow,
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amountPayable",
                },
            },
        },
    ]);

    // Últimas reservas
    const recentReservations = await ReservationTime.find()
        .sort({ createdAt: -1 })
        .limit(5);

    return {
        reservationsToday,

        totalReservations,

        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,

        revenueToday: revenueToday.length > 0 ? revenueToday[0].total : 0,

        recentReservations,
    };
};

const userDashboard = async (businessID) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);

    // Reservas de hoje
    const reservationsToday = await ReservationTime.countDocuments({
        businessId: businessID,


        date: {
            $gte: today,
            $lt: tomorrow,
        },
    });

    // Total de reservas
    const totalReservations = await ReservationTime.countDocuments({ businessId: businessID });

    // Total arrecadado
    const totalRevenue = await ReservationTime.aggregate(


        [
            {
                $group: {
                    _id: null,
                    businessId: { $first: "$businessID" },
                    total: {
                        $sum: "$amountPayable",
                    },
                },
            },
        ]);

    // Arrecadação de hoje
    const revenueToday = await ReservationTime.aggregate(

        [
            {
                $match: {
                    date: {
                        $gte: today,
                        $lt: tomorrow,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    businessId: { $first: "$businessID" },
                    total: {
                        $sum: "$amountPayable",
                    },
                },
            },
        ]);

    // Últimas reservas
    const recentReservations = await ReservationTime.find({ businessId: businessID })
        .sort({ createdAt: -1 })
        .limit(5);

    return {
        reservationsToday,

        totalReservations,

        totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,

        revenueToday: revenueToday.length > 0 ? revenueToday[0].total : 0,

        recentReservations,
    };
};



export default {
    dashboard,
    userDashboard
};
