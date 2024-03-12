const { ObjectId } = require("mongodb");

class MotelModel {
    constructor(client) {
        this.motelModel = client.db().colection("motel");
    };
    extractConactData(payload) {
        const motel = {
            IDUser: payload.motel.IDUser,
            quantityRoom: payload.motel.quantityRoom,
            address: payload.motel.address,
        };
        Object.keys(motel).forEach(
            (key) => motel[key] === undefined && delete motel[key]
        )
        return motel
    }
    async create(payload) {
        const item = this.extractConactData(payload);
        const result = await this.motelModel.insertOne(
            item.motel
        );

        return result.value;
    };
}
module.exports = MotelModel;