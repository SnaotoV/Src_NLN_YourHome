const { ObjectId } = require("mongodb");

class StatusModel {
    constructor(client) {
        this.Status = client.db().collection("listStatus");
    };
    tranformStatusEWData(payload) {
        const room = {
            statusCode: 1,
            value: payload.value

        };
        Object.keys(room).forEach(
            (key) => room[key] === undefined && delete room[key]
        )
        return room
    }

    async create(idMotel) {
        const status = this.tranformStatusEWData(payload);
        const resStatus = await this.Status.insertOne(
            status
        );

        return resStatus;
    };

    async findByStatusCode(code) {
        const cursor = await this.Status.find({
            statusCode: code
        });
        return await cursor.toArray();
    }
}
module.exports = StatusModel;