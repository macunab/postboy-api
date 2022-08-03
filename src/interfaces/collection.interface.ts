import { Document, Types } from "mongoose";
import { Request } from "./request.interface";
import { UserDocument } from "./user.interface";

export interface Collection extends Document{
    _id: Types.ObjectId;
    name: string,
    user: UserDocument,
    requests?: [Request]
}