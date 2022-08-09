import passport from 'passport';
import userModel from '../models/user.model';
import passportGoogle from 'passport-google-oauth2';
import { IUser } from '../interfaces/user.interface';

class GoogleAuth {

    passportConf() {
        const GoogleStrategy = passportGoogle.Strategy;
        const clientId = process.env.GOOGLE_CLIENT_ID as string;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser(async(id: string, done) => {
            const user: IUser | null = await userModel.findById(id);
            console.log(`El ID DEL DOCUMENTO ES: ${user?._id}`);
            done(null, { id: user?._id! });
        });
        passport.use('sign-in-google', new GoogleStrategy({
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: 'http://localhost:4000/auth/google/callback'
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                   // console.log(profile);
                    const user = await userModel.findById(profile.id);
                    if(user) {
                        return done(null, user);
                    } else {
                        //create user and save...
                        const newUser = await userModel.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails?.[0].value
                        })
                        done(null, newUser);
                    }
                } catch(err) {
                    console.log(err);
                    return done(null, false);
                }
            }));

    }
}

export default new GoogleAuth();