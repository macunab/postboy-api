import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if(dotenvResult.error) {
    throw dotenvResult.error;
}
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import DbConfig from './db/dbConfig';
import passport from 'passport';
import googleAuth from './helpers/googleAuth';
import { CommonRoutesConfig } from './helpers/commonRoutesConfig';
import { CollectionRoute } from './routes/colletion.route';
import { RequestRoute } from './routes/request.route';
import { AuthRoute } from './routes/auth.route';
import jwtStrategy from './helpers/jwtStrategy';

DbConfig.connectDb(process.env.DB_CNN as string);

const PORT: number = parseInt(process.env.PORT as string, 10);
const app: Application = express();
const routes: Array<CommonRoutesConfig> = [];
// passport google strategy
googleAuth.passportConf();
jwtStrategy.verifyJwt();

app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(express.json());

routes.push(new CollectionRoute(app));
routes.push(new RequestRoute(app));
routes.push(new AuthRoute(app));

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})