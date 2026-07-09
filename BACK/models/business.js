import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(

    {
        NameSocyte: {
            type: [{
                type: String,
                trim: true

            }],

            required: true
        },

        Address: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },

        ContactPhoneNumber: {
            type: Number,
            required: true,
            trim: true,
        },

        OpenAirOrCovered: {
            type: [{
                type: String,
                trim: true
            }],
            required: true,
        },

        daysOfOperation: {

            type: [
                {
                    type: String,
                    trim: true
                }
            ],

            required: true
        },

        

        hourlyRate: {
            type: Number,
            required: true,
            trim: true,
        },

        paymentMethods: {


            type: [
                {
                    type: String,
                    trim: true
                }
            ],

            required: true
        },


        cancellationPolicy: {
            type: String,
            required: true,
            trim: true,
        },

        UsagePolicy: {
            type: String,
            required: true,
            trim: true,
        },

        ItHasChangingRoomsAndASnackBar: {
            type: String,
            required: true,
            trim: true,
        },





    }

);

export default mongoose.model("Business", businessSchema);
