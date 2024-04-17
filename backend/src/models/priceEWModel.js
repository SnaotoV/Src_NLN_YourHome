const { ObjectId } = require("mongodb");

class PriceEWModel {
    constructor(client) {
        this.PriceEW = client.db().collection("priceEW");
    };
    tranformPriceEWData(idParent, payload) {
        const priceEW = {
            IdMotel: ObjectId.isValid(idParent) ? new ObjectId(idParent) : null,
            priceE: payload.priceE,
            priceW: payload.priceW,
            statusCode: payload.statusCode ? payload.statusCode : 4,
            create_at: null,
            update_at: null
        };
        Object.keys(priceEW).forEach(
            (key) => priceEW[key] === undefined && delete priceEW[key]
        )
        return priceEW
    }
    async create(idParent, payload) {
        const item = this.tranformPriceEWData(idParent, payload);
        item.create_at = new Date();
        const resPriceEW = await this.PriceEW.insertOne(
            item
        );

        return resPriceEW;
    };
    async update(id, statusCode) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const cursor = await this.PriceEW.updateOne(filter, {
            $set: {
                statusCode: statusCode
            }
        })
        return cursor
    }
}
module.exports = PriceEWModel;