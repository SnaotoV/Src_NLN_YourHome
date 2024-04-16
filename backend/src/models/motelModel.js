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
            userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
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
    async countAll(filter) {
        let filterUser = {};
        if (filter && filter.userId) {
            filterUser = {
                userId: ObjectId.isValid(filter.userId) ? new ObjectId(filter.userId) : null
            }
        }
        const cursor = await this.Motel.count(filterUser);
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
            if (filter.userId) {
                filter.userId = ObjectId.isValid(filterClone.userId) ? new ObjectId(filterClone.userId) : null;
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
    async findById(id, type) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let date = new Date().getUTCDate();
        let formatNumber = Intl.NumberFormat("es-Us", { minimumIntegerDigits: 2 })
        let time_at_pay = `${year}-${formatNumber.format(month)}-${formatNumber.format(date)}T00:00:00.000Z`;
        let time_late_pay = `${year}-${formatNumber.format(month - 1)}-${formatNumber.format(date)}T00:00:00.000Z`;
        let cursor = {}
        if (type === 'admin') {
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
            },
            {
                $lookup:
                {
                    from: 'room',
                    localField: '_id',
                    foreignField: 'idMotel',
                    pipeline: [
                        {

                            $lookup:
                            {
                                from: 'inforHire',
                                localField: '_id',
                                foreignField: 'roomId',
                                pipeline: [
                                    {
                                        $match: {
                                            statusCode: 4
                                        }
                                    },
                                    {
                                        $lookup:
                                        {
                                            from: 'user',
                                            localField: 'userId',
                                            foreignField: '_id',
                                            as: 'user'
                                        }
                                    },
                                    {
                                        $lookup:
                                        {
                                            from: 'bills',
                                            localField: '_id',
                                            foreignField: 'hireId',
                                            pipeline: [
                                                {
                                                    $match: {
                                                        $or: [
                                                            {
                                                                date_end: { $gte: time_at_pay }
                                                            },
                                                            {
                                                                date_end: { $gte: time_late_pay }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    $sort: { _id: -1 }
                                                }
                                            ],
                                            as: 'bills'
                                        }
                                    },

                                ],
                                as: 'inforHire',
                            }
                        },

                    ],
                    as: 'listRoom'
                }
            },
            {

                $lookup:
                {
                    from: 'priceEW',
                    localField: '_id',
                    foreignField: 'IdMotel',
                    pipeline: [
                        {
                            $match: {
                                statusCode: 4
                            }
                        }
                    ],
                    as: 'priceEW',
                }
            },
            ]);
        }
        else {
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
            },
            {
                $lookup:
                {
                    from: 'room',
                    localField: '_id',
                    foreignField: 'idMotel',
                    as: 'listRoom'
                }
            },
            {

                $lookup:
                {
                    from: 'priceEW',
                    localField: '_id',
                    foreignField: 'IdMotel',
                    pipeline: [
                        {
                            $match: {
                                statusCode: 4
                            }
                        }
                    ],
                    as: 'priceEW',
                }
            },
            ]);
        }

        return await cursor.toArray();

    }

}
module.exports = MotelModel;