const { ObjectId } = require("mongodb");

class ImageModel {
    constructor(client) {
        this.Image = client.db().collection("image");
    };
    tranformImageData(payload, type) {
        const image = {
            IdParent: payload.idParent,
            type: type,
            image: payload.image,
            create_at: null,
            update_at: null
        };
        Object.keys(image).forEach(
            (key) => image[key] === undefined && delete image[key]
        )
        return image
    }
    async create(payload, type) {
        const item = this.tranformImageData(payload, type);
        item.create_at = new Date();
        const resImage = await this.Image.insertOne(
            item
        );

        return resImage.value;
    };
}
module.exports = ImageModel;