const { ObjectId } = require("mongodb");

class PriceEWModel {
    constructor(client) {
        this.PriceEW = client.db().collection("priceEW");
    };
    tranformPriceEWData(idParent, payload) {
        const priceEW = {
            IdMotel: idParent,
            priceE: payload.priceE,
            priceW: payload.priceW,
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

        return resPriceEW.value;
    };
}
module.exports = PriceEWModel;