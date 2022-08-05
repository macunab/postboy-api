import dbConfig from "../db/dbConfig";
import { Request } from "../interfaces/request.interface";
import collectionModel from "./collection.model";

class RequestModel {
    schema = dbConfig.getMongoose().Schema;
    constructor() {}
    requestSchema = new this.schema<Request>({
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
    async findOneRequest(id: string) {
        const request = await this.RequestDb.findById(id);
        return request;
    }
    // delete a request db method
    async deleteRequest(request: Request) {
        console.log(`The request ID is: ${request._id}`)
        await this.RequestDb.deleteOne({ _id: request._id })
            .then(result => {
                console.log(result);
                collectionModel.removeRequest(request.owner, request);
            })
            .catch(err => {
                console.log(`An error ocurrer while trying delete a request, error: ${err}`);
            });
    }
}

export default new RequestModel();