import mongoose from 'mongoose';

class DbConfig {
    getMongoose() {
        return mongoose;
    }
    connectDb = (url: string) => {
        mongoose.connect(url)
            .then(() => {
                console.log('DB connected successfully');
            })
            .catch((err) => {
                console.log(`An error ocurred while trying connect the db, ${err}`);
            })
    }
}

export default new DbConfig();