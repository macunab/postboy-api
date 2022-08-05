import { Document, Types } from "mongoose"
import { Collection } from "./collection.interface"

export interface Request {
    _id?: Types.ObjectId,
    name: string,
    url: string,
    type: string,
    headers?: [Pair],
    queryParams?: [Pair]
    json?: string,
    xml?: string,
    formData?: [Pair],
    owner: Collection
}

export interface Pair {
    key: string,
    value: string
}
/*
export type RequestType = Document & {
    _id?: Types.ObjectId,
    name: string,
    url: string,
    type: string,
    headers?: [Pair],
    queryParams?: [Pair]
    json?: string,
    xml?: string,
    formData?: [Pair]
}*/