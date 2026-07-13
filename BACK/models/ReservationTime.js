
import mongoose from "mongoose";

const ReservationTimeSchema = new mongoose.Schema(
    {

        businessId: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true

        },


        date: {
            type: Date,
            required: true,
            trim: true
        },

        startTime: {
            type: [
                {
                    type:Date,
                    trim:true
                }
             ],

             required: true
        },
        endTime: {
            type: [
                {
                    type:Date,
                    trim:true
                }
             ],

             required: true
        },

        nameOfPersonInCharge: {
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