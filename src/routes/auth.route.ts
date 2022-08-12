import { Application } from "express";
import passport from "passport";
import authController from "../controllers/auth.controller";
import { CommonRoutesConfig } from "../helpers/commonRoutesConfig";


export class AuthRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'AuthRoute');
    }
    configureRoutes(): Application {
        this.app.route('/auth/google')
            .get(passport.authenticate('sign-in-google', {scope: ['profile', 'email']}));
        this.app.route('/auth/google/callback')
            .get(passport.authenticate('sign-in-google', { session: false }),
                authController.createJwt);    
       /* this.app.route('/auth/logout')
            .post(authController.logout);     */           
        return this.app;
    }
}