import { Request, Response } from "express";
import { Collection } from "../interfaces/collection.interface";
import collectionModel from "../models/collection.model";

class CollectionController {

    async createCollection(req: Request, res: Response) {
        const collection: Collection = req.body;
        // set the user for the collection
        collection.user = req.user!.user;
        try {
            await collectionModel.createCollection(collection);
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
        // lint error but working
        const user = req.user;
        console.log(user!.user.name);

        //console.log(`EL USUARIO ES:::::: ${req.params.username}`);
        try {
            const collections = await collectionModel.getCollections();
            res.status(200).json({
                ok: true,
                items: collections,
                user: req.user
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all collections, error: ${err}`
            });
        }
    }

    async deleteCollection(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await collectionModel.deleteCollection(id);
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