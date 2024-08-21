import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Currency: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    OrderID: {
        type: String,
        required: true,
    },
    International: {
        type: Boolean,
        required: true,
    },
    Method: {
        type: String,
        required: true,
    },
    VPA: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Contact: {
        type: String,
        required: true,
    },
    FullName: {
        type: String,
        required: true,
    },
    ContactNumber: {
        type: Number,
        required: true,
    },
    WhatsAppNumber: {
        type: Number,
        required: true,
    },
    CreatedAt: {
        type: Date,
        required: true,
    },
});

const UserModel = mongoose.model("razorpay_collection", UserSchema);
export default UserModel;