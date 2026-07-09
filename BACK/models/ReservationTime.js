
import mongoose from "mongoose";

const ReservationTimeSchema = new mongoose.Schema(
    {


        Date: {
            type: Date,
            required: true,
            trim: true
        },

        Hours: {
            type: [
                {
                    type:Number,
                    trim:true
                }
             ],

             required: true
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
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Time", ReservationTimeSchema);