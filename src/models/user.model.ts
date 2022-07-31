import dbConfig from "../db/dbConfig";
import { User, UserDocument } from '../interfaces/user.interface';

class UserModel {
    schema = dbConfig.getMongoose().Schema;
    constructor() {};
    userSchema = new this.schema<UserDocument>({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        googleId: String,
        password: {
            type: String
        }
    });
    UserDb = dbConfig.getMongoose().model<UserDocument>('User', this.userSchema);
    async getUser(id: string) {
        const user = await this.UserDb.findById(id);
        return user;
    }
    async findOneUser(googleId: string) {
        const user = await this.UserDb.findOne({ googleId: googleId });
        return user;
    }
    async createUser(user: any) {
        const newUser = await this.UserDb.create(user);
        return newUser;
    }
}

export default new UserModel();