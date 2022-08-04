import dbConfig from "../db/dbConfig";
import { Collection } from "../interfaces/collection.interface";
import { Request } from "../interfaces/request.interface";

class CollectionModel {
    schema = dbConfig.getMongoose().Schema;
    constructor() {};
    collectionSchema = new this.schema({
        name: {
            type: String,
            required: true
        },
        user: {
            type: this.schema.Types.ObjectId,
            ref: 'User'
        },
        requests: [{
            type: this.schema.Types.ObjectId,
            ref: 'Request'
        }]
    });
    collectionDb = dbConfig.getMongoose().model<Collection>('Collection', this.collectionSchema);
    // get all collections
    async getCollections() {
        const collections = await this.collectionDb.find().populate('requests');
        return collections;
    }
    // create a collection
    async createCollection(collection: Collection) {
        const newCollection = new this.collectionDb(collection);
        await newCollection.save();
    }
    // delete collection. Todo: delete requests of collection
    async deleteCollection(id: string) {
        await this.collectionDb.deleteOne({ _id: id });
    }
    // push a request
    async addRequest(id: string, request: Request) {
        await this.collectionDb.findOneAndUpdate({ _id : id }, { $push: { requests: request }}, { new: true });
    }

}

export default new CollectionModel();