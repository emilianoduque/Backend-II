import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purcharser: {
        type: String,
        required: true
    },
    products: {
        type: Object
    }
});

const ticketModel = model("ticket", ticketSchema);
export default ticketModel;