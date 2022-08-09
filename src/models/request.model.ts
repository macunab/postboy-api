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
/*
class RequestModel {
    schema = dbConfig.getMongoose().Schema;
    constructor() {}
    requestSchema = new this.schema({
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
            type: this.schema.Types.ObjectId,
            ref: 'Collection'
        }
    }).pre('deleteOne', function(next) {
        console.log('Se va a eliminar una request');
        next();
    })
    RequestDb = dbConfig.getMongoose().model<IRequest>('Request', this.requestSchema);
    async createRequest(request: Request, collectionId: string) {
        const newRequest = new this.RequestDb(request);
        await newRequest.save().then( result => {
            console.log(result);
        })
        .catch((err) => {
            console.log(`Se ha producido un error al intentar crear la request, error: ${err}`);
        });
    }
    async updateRequest(id: string, request: Request) {
        await this.RequestDb.findByIdAndUpdate(id, request);
    }
    async findOneRequest(id: string) {
        const request = await this.RequestDb.findById(id);
        return request;
    }
    async deleteRequest(request: Request) {
        console.log(`The request ID is: ${request._id}`);
        await collectionModel.removeRequest(request.owner, request);

    }
}

export default new RequestModel();*/