const { ObjectId } = require("mongodb");

class UserModel {
    constructor(client) {
        this.User = client.db().collection("user");
    }
    extractConactData(payload) {
        const user = {
            CICNumber: payload.CICNumber,
            username: payload.username,
            password: payload.password,
            fullName: payload.fullName,
            address: payload.address,
            phoneNumber: payload.phoneNumber,
            birthday: payload.birthday,
            create_at: null,
            update_at: null
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        )
        return user;
    }
    async create(payload) {
        const user = this.extractConactData(payload);
        user.create_at = new Date();
        const result = await this.User.insertOne(
            user
        );
        return result.value;
    };
    async find() {
        const cursor = await this.User.find();
        return await cursor.toArray();
    }
    async findInPage(page) {
        let start = (page - 1) * 10;
        let quantity = 10
        const cursor = await this.User.find({}, {
            skip: start,
            limit: quantity,
        });
        return await cursor.toArray();
    }
    async findByUsername(user) {
        const cursor = await this.User.find({
            username: user.username,
            password: user.password
        });
        return await cursor.toArray();
    }
    async checkUserExist(user) {
        const cursor = await this.User.find({
            username: user.username
        });
        let data = await cursor.toArray();
        if (data && data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async countAll() {
        const cursor = await this.User.count();
        return cursor
    }
    async upated(user) {
        const filter = {
            _id: ObjectId.isValid(user._id) ? new ObjectId(user._id) : null,
        };
        const cursor = await this.User.updateOne(filter, {
            $set: {
                fullName: user.fullName,
                username: user.username,
                password: user.password,
                address: user.address,
                phoneNumber: user.phoneNumber
            }
        })
        return cursor
    }
    async delete(user) {
        let result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(user) ? new ObjectId(user) : null,
        })
        return result
    }
}

module.exports = UserModel;