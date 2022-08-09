import { model, Schema } from "mongoose";
import { Collection, ICollection } from '../interfaces/collection.interface';


const collectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
},
{
    toJSON: {
        virtuals: true
    }
});

collectionSchema.virtual('requests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'owner'
});

const collectionModel = model<ICollection & Document>('Collection', collectionSchema);

export default collectionModel;
/*
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }).virtual('requests', {
        ref: 'Request',
        localField: '_id',
        foreignField: 'owner'
    });

    collectionDb = dbConfig.getMongoose().model<ICollection & Document>('Collection', this.collectionSchema);
    async getCollections(user: UserDocument) {
        const collections = await this.collectionDb.find({ user: user }).populate('requests');
        return collections;
    }
    async createCollection(collection: Collection) {
        const newCollection = new this.collectionDb(collection);
        await newCollection.save();
    }
    async deleteCollection(id: string) {
        await this.collectionDb.deleteOne({ _id: id });
    }
    async addRequest(id: string, request: Request) {
        await this.collectionDb.findOneAndUpdate({ _id : id },
             { $push: { requests: request }}, { new: true });
    }

    async removeRequest(collection: Collection, request: Request) {

        console.log(`request: ${request}`);
        console.log(dbConfig.getMongoose().Types.ObjectId.isValid(collection._id));
             const re = {
                _id: request._id,
             };
             await this.collectionDb.updateOne(
                { _id: collection._id },
                {$pull: {requests: re }},
                { new: true, upsert: true }
             ).then(result => {
                console.log(result);
             })
             .catch(err => {
                console.log(err);
             }); 
    }

}

export default new CollectionModel();*/