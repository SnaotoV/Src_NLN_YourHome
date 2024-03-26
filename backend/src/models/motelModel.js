import ImageModel from "./ImageModel";
import PriceEWModel from "./priceEWModel";
import RoomModel from "./RoomModel";
const { ObjectId } = require("mongodb");

class MotelModel {
    constructor(client) {
        this.Motel = client.db().collection("motel");
        this.PriceEW = new PriceEWModel(client);
        this.Image = new ImageModel(client);
        this.Room = new RoomModel(client);
    };
    tranformMotelData(payload) {
        const motel = {
            IDUser: payload.IDUser,
            name: payload.name,
            quantity: payload.quantity,
            address: payload.address,
            price: payload.price,
            horizontal: payload.horizontal,
            vertical: payload.vertical,
            create_at: null,
            update_at: null
        };
        Object.keys(motel).forEach(
            (key) => motel[key] === undefined && delete motel[key]
        )
        return motel
    }
    async create(payload) {
        const motel = this.tranformMotelData(payload);
        motel.create_at = new Date();

        let resData = {};
        const resMotel = await this.Motel.insertOne(motel);
        if (resMotel) {
            const resImage = await this.Image.create(resMotel.insertedId, payload, 'motel');
            const resPriceEW = await this.PriceEW.create(resMotel.insertedId, payload);
            for (let i = 0; i < payload.quantity; i++) {
                await this.Room.create(resMotel.insertedId);
            }
        }


        return resMotel;
    };
    async countAll() {
        const cursor = await this.Motel.count();
        return cursor
    }
    async findInPage(page, quantityPage) {
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage
        const cursor = await this.Motel.find({}, {
            skip: start,
            limit: quantity,
        });
        return await cursor.toArray();
    }
}
module.exports = MotelModel;