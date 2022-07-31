import { Document } from 'mongoose';

export interface User {
    _id?: string,
    name: string,
    email: string,
    password?: string
}

export type UserDocument = Document & {
    name: string;
    email: string;
    googleId: string;
    password?: string
}