import passport from 'passport';
import userModel from '../models/user.model';
import passportGoogle from 'passport-google-oauth20';

class GoogleAuth {

    passportConf() {
        const GoogleStrategy = passportGoogle.Strategy;
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser(async(id: string, done) => {
            const user = await userModel.getUser(id);
            done(null, {id: user!._id.toString() });
        });
        passport.use('sign-in-google', new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: 'http://localhost:4000/auth/google/callback'
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile);
                    // find user by code-interface//id-profile
                    const user = await userModel.getUser(profile.id);
                    if(user) {
                        return done(null, undefined, 'El usuario no existe');
                    } else {
                        //create user and save...
                        done(null, profile);
                    }
                } catch(err) {
                    console.log(err);
                    return done(null, undefined, 'Se ha producido un error');
                }
            }));

    }
}

export default new GoogleAuth();