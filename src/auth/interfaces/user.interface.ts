import { Document } from 'mongoose';

export interface User extends Document { 
    username:string;
    email:string;
    password:string;
    img?:string;
    createdAt?:Date,
    updatedAt?:Date
};