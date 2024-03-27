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
            ward: payload.ward,
            district: payload.district,
            province: payload.province,
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
            for (let i = 0; i < payload.listImage.length; i++) {
                let image = {
                    image: payload.listImage[i],
                    idParent: resMotel.insertedId
                }
                await this.Image.create(image, 'motel');
            }
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
    async findInPage(page, quantityPage, filter) {
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage
        let cursor = [];
        if (filter) {
            let filterClone = filter;
            if (filter.name) {
                filter.name = { $regex: new RegExp(filterClone.name), $options: "i" };
            }
            cursor = await this.Motel.aggregate([{
                $match: filter
            }, {
                $lookup:
                {
                    from: 'image',
                    localField: '_id',
                    foreignField: 'IdParent',
                    as: 'image'
                }
            }], {
                skip: start,
                limit: quantity,
            });

        }
        else {

            cursor = await this.Motel.aggregate([{
                $lookup:
                {
                    from: 'image',
                    localField: '_id',
                    foreignField: 'IdParent',
                    as: 'image'
                }
            }], {
                skip: start,
                limit: quantity,
            });
        }
        return await cursor.toArray();
    }
    async findById(id) {
    }
    async findallById(id) {

    }
}
module.exports = MotelModel;