
import mongoose from "mongoose";

const ReservationTimeSchema = new mongoose.Schema(
    {

        date:{
           type: String,
           required:true,
           trim:true
        },

        startTime: {
            type: String,
            required:true,
            trim:true
        },

        endTime: {
            type: String,
            required: true,
            trim:true
        },

        NameOfPersonInCharge: {
            type: String,
            required: true,
            trim: true
        },

        amountPayable: {
            type: Number,
            required: true,
            trim: true,
        }
    }
);

export default mongoose.model("Time", ReservationTimeSchema);