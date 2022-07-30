import dbConfig from "../db/dbConfig";
import { UserDocument } from '../interfaces/user.interface';

class UserModel {
    schema = dbConfig.getMongoose().Schema;
    constructor() {};
    userSchema = new this.schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        }
    });
    UserDb = dbConfig.getMongoose().model('User', this.userSchema);

    getUserModel() {
        return this.UserDb;
    }

    async getUser(id: string) {
        const user = this.UserDb.findById(id);
        return user;
    }

}

export default new UserModel();