import { Application } from "express";
import passport from "passport";
import { CommonRoutesConfig } from "../helpers/commonRoutesConfig";


export class AuthRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'AuthRoute');
    }
    configureRoutes(): Application {
        this.app.route('/auth/google')
            .get(passport.authenticate('sign-in-google', {scope: ['profile', 'email']}));
        this.app.route('/auth/google/callback')
            .get(passport.authenticate('sign-in-google', { session: false }));    
        return this.app;
    }
}