import mongoose, { Schema } from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, requere: true },
    email: { type: String, requere: true },
    phone: { type: String, requere: true },
    type: { type: String, requere: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId },
})

export const Contact = mongoose.model('Contact', contactSchema)