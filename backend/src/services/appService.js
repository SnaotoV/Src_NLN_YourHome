import MongoDB from '../config/mongo.config';
import UserModel from '../models/usersModel';
let registerService = async (user) => {
    if (user) {
        let User = new UserModel(MongoDB.client);
        let data = User.create(user);
        console.log(data);
    }
}

module.exports = {
    registerService: registerService,
}