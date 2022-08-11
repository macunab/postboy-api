import { Request, Response } from "express";
import { ICollection } from "../interfaces/collection.interface";
import collectionModel from "../models/collection.model";

class CollectionController {

    async createCollection(req: Request, res: Response) {
        const collection: ICollection = req.body;
        collection.user = req.user!.user;
        try {
            const collectionQuery = new collectionModel(collection);
            await collectionQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'collection created successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a collection, error: ${err}`
            });
        }
    }

    async findCollections(req: Request, res: Response) {
        const user = req.user;
        console.log(user!.user.name);
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user not authenticated'
            });
        }
        try {
            const collections = await collectionModel.find({ user: user.user}).populate('requests');
            res.status(200).json({
                ok: true,
                data: collections,
                user: req.user
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all collections, error: ${err}`
            });
        }
    }

    // todo: delete ref requests
    async deleteCollection(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await collectionModel.deleteOne({ _id: id });
            res.status(200).json({
                ok: true,
                msg: 'Collection delete successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying delete a collection, error: ${err}`
            });
        }
    }
}

export default new CollectionController();