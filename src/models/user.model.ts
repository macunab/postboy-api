import { Document, model, Schema } from "mongoose";
import { IUser } from '../interfaces/user.interface';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = model<IUser & Document>('User', userSchema);

export default userModel; 
/*
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
    async findById(id: string) {
        const user = await this.UserDb.findById(id);
        return user;
    }
    async createUser(user: any) {
        const newUser = await this.UserDb.create(user);
        return newUser;
    }
}

export default new UserModel();*/