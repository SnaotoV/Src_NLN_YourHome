const { ObjectId } = require("mongodb");

class RoomModel {
    constructor(client) {
        this.Room = client.db().collection("room");
    };
    tranformRoomEWData(idMotel) {
        const room = {
            idMotel: idMotel,
            statusCode: 1,
            create_at: null,
            update_at: null
        };
        Object.keys(room).forEach(
            (key) => room[key] === undefined && delete room[key]
        )
        return room
    }

    async create(idMotel) {
        const room = this.tranformRoomEWData(idMotel);
        room.create_at = new Date();
        const resRoom = await this.Room.insertOne(
            room
        );

        return resRoom;
    };
    async fetchPage(type, page, quantityPage) {
        const cursor = await this.Status.find
    }
}
module.exports = RoomModel;