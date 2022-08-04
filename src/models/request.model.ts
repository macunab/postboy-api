import dbConfig from "../db/dbConfig";
import { Request } from "../interfaces/request.interface";
import collectionModel from "./collection.model";

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
        }]
    });
    RequestDb = dbConfig.getMongoose().model<Request>('Request', this.requestSchema);
    // create request db method
    async createRequest(request: Request, collectionId: string) {
        const newRequest = new this.RequestDb(request);
        await newRequest.save().then( result => {
            console.log(result);
            collectionModel.addRequest(collectionId, result);
        })
        .catch((err) => {
            console.log(`Se ha producido un error al intentar crear la request, error: ${err}`);
        });
    }
    // update request db method
    async updateRequest(id: string, request: Request) {
        await this.RequestDb.findByIdAndUpdate(id, request);
    }
    // delete a request db method
    async deleteRequest(id: string) {
        await this.RequestDb.deleteOne({ _id: id });
    }
}

export default new RequestModel();