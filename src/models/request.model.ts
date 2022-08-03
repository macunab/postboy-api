import dbConfig from "../db/dbConfig";
import { Request } from "../interfaces/request.interface";

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
    async createRequest(request: Request) {
        const newRequest = new this.RequestDb(request);
        await newRequest.save();
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