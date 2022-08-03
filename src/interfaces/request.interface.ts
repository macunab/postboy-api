import { Document, Types } from "mongoose"

export interface Request extends Document {
    _id?: Types.ObjectId,
    name: string,
    url: string,
    type: string,
    headers?: [Pair],
    queryParams?: [Pair]
    json?: string,
    xml?: string,
    formData?: [Pair]
}

export interface Pair {
    key: string,
    value: string
}