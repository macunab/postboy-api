import { Document, Types } from "mongoose";
import { Request } from "./request.interface";
import { IUser, UserDocument } from "./user.interface";

export interface Collection{
    _id: Types.ObjectId;
    name: string;
    user: UserDocument;
    requests?: [Request];
}

export interface ICollection {
    _id: string;
    name: string;
    user: Types.ObjectId;
}