import { Document, Types } from 'mongoose';

export interface User {
    _id?: string,
    name: string,
    email: string,
    googleId: string;
    password?: string
}

export type UserDocument = Document & {
    _id: Types.ObjectId;
    name: string;
    email: string;
    googleId: string;
    password?: string
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    googleId: string;
    password?: string;
}