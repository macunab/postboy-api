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