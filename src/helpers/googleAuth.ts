import passport from 'passport';
import userModel from '../models/user.model';
import passportGoogle from 'passport-google-oauth2';

class GoogleAuth {

    passportConf() {
        const GoogleStrategy = passportGoogle.Strategy;
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser(async(id: string, done) => {
            console.log(`ID IN DESERIALIZEUSER: ${id}`);
            const user = await userModel.findOneUser(id);
            done(null, { id: user!.googleId });
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
                    const user = await userModel.findOneUser(profile.id);
                    if(user) {
                        return done(null, false);
                    } else {
                        //create user and save...
                        const newUser = await userModel.createUser({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails?.[0].value
                        })
                        done(null, profile);
                    }
                } catch(err) {
                    console.log(err);
                    return done(null, false);
                }
            }));

    }
}

export default new GoogleAuth();