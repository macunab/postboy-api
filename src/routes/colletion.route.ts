import { Application } from "express";
import { check } from "express-validator";
import collectionController from "../controllers/collection.controller";
import { CommonRoutesConfig } from "../helpers/commonRoutesConfig";
import validationFields from "../middlewares/validationFields";

export class CollectionRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'CollectionRoute')
    }
    // here declare the routes for collections
    configureRoutes(): Application {
        
        this.app.route('/collections/create')
            .post(
                check('name', 'name is required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                collectionController.createCollection
            );

        this.app.route('/collections')
            .get( collectionController.findCollections );

        this.app.route('/collections/:id')
            .delete( collectionController.deleteCollection );

        return this.app;
    }
}