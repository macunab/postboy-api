import { Application, NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import passport from "passport";
import requestController from "../controllers/request.controller";
import { CommonRoutesConfig } from "../helpers/commonRoutesConfig";
import validationFields from "../middlewares/validationFields";


export class RequestRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'RequestRoute');
    }

    configureRoutes(): Application {
        this.app.route('/requests/:collection/create')
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'the name is required').not().isEmpty(),
                check('url', 'the url ir required').not().isEmpty(),
                check('type', 'the type is required').not().isEmpty(),
                validationFields.verifyFieldsErrors,
                requestController.createRequest
            );
            this.app.route('/request/:id')
                .all((req: Request, res: Response, next: NextFunction) => {
                    next();
                })
                .put(
                    check('name', 'the name is required').not().isEmpty(),
                    check('url', 'the url ir required').not().isEmpty(),
                    check('type', 'the type is required').not().isEmpty(),
                    validationFields.verifyFieldsErrors,
                    requestController.updateRequest
                )
                .delete(requestController.deleteRequest)
        return this.app;
    }
}