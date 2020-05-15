import { Schema } from 'mongoose';

export const userSchema = new Schema({
    username: { type: String, required: [true, 'Username is required'], unique:true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // img: { type: String, required: false },
}, { timestamps: true });
