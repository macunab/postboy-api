import { model, Schema, Document } from "mongoose";
import { IRequest } from "../interfaces/request.interface";

const requestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    headers: [{
        key: String,
        value: String
    }],
    queryParams: [{
        key: String,
        value: String
    }],
    json: String,
    xml: String,
    formData: [{
        key: String,
        value: String
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    }
});

const requestModel = model<IRequest & Document>('Request', requestSchema);

export default requestModel;