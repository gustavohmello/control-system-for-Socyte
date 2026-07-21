import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(

    {

        ownerID: {                                         // adicionei owner id
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,

        },

        workersID: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,

            }],
            required:false,
            trim:true
        },


        nameSocyte: {
            type: [{
                type: String,
                trim: true

            }],

            required: true
        },

        address: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        contactPhoneNumber: {
            type: Number,
            required: true,
            trim: true,
        },

        openAirOrCovered: {
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

        usagePolicy: {
            type: String,
            required: true,
            trim: true,
        },

        itHasChangingRoomsAndASnackBar: {
            type: String,
            required: true,
            trim: true,
        },





    }

);

export default mongoose.model("Business", businessSchema);
