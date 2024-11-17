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
            gender: payload.gender,
            isAdmin: payload.isAdmin,
            statusCode: payload.statusCode ? payload.statusCode : 4,
            create_at: null,
            update_at: null
        };
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        )
        return user;
    }
    async create(payload) {
        payload.isAdmin = false;
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
    // async findInPage(page) {
    //     let start = (page - 1) * 10;
    //     let quantity = 10
    //     const cursor = await this.User.find({}, {
    //         skip: start,
    //         limit: quantity,
    //     });
    //     return await cursor.toArray();
    // }
    async findByUsername(user) {
        const cursor = await this.User.find({
            username: user.username,
            password: user.password,
            statusCode: 4,
        });

        return cursor.toArray();
    }
    async findByID(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async checkUserExist(user) {
        const cursor = await this.User.find({
            username: user.username,
            statusCode: 4,

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
    async updated(id, user) {
        let idObject = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const cloneFilter = this.extractConactData(user)
        if (user.statusCode === 0) cloneFilter.statusCode = 0;
        const cursor = await this.User.updateOne(idObject, {
            $set: cloneFilter
        })
        return cursor
    }
    async delete(user) {
        let result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(user) ? new ObjectId(user) : null,
        })
        return result
    }
    async countAll() {
        const cursor = await this.User.count();
        return cursor
    }
    async findInPage(page, quantityPage) {
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage
        let cursor = [];
        cursor = await this.User.find({
            isAdmin: false,
            statusCode: 4
        }, {
            skip: start,
            limit: quantity,
            sort: {
                _id: -1
            },

        });
        return cursor.toArray();
    }

}

module.exports = UserModel;