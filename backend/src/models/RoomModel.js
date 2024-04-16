const { ObjectId } = require("mongodb");

class RoomModel {
    constructor(client) {
        this.Room = client.db().collection("room");
        this.dateHire = client.db().collection("dateHire");
        this.inforHire = client.db().collection("inforHire");
        this.Bill = client.db().collection("bills");
        this.inforRegisterHire = client.db().collection("inforRegisterHire");
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
    fillDataBill(bill) {
        let billClone = {
            valueE: bill.valueE,
            valueW: bill.valueW,
            priceEW: ObjectId.isValid(bill.priceEW) ? new ObjectId(bill.priceEW) : null,
            price: bill.price,
            hireId: ObjectId.isValid(bill.hireId) ? new ObjectId(bill.hireId) : null,
            time_start: bill.time_start,
            time_end: bill.time_end,
            date_pay: bill.date_pay,
            date_end: bill.date_end,
            create_at: bill.create_at,
            update_at: bill.update_at,
            statusCode: bill.statusCode
        }
        Object.keys(billClone).forEach(
            (key) => billClone[key] === undefined && delete billClone[key]
        )
        return billClone;
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
    async findRegisterHire(room, idUser) {
        let filter = {
            userId: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
            motelId: ObjectId.isValid(room.idMotel) ? new ObjectId(room.idMotel) : null,
            statusCode: 9,
        };
        const cursor = await this.inforRegisterHire.find(filter);
        return cursor.toArray();

    }
    async addRegister(room, idUser) {
        let dataInforRegisterHire = {
            userId: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
            roomId: ObjectId.isValid(room._id) ? new ObjectId(room._id) : null,
            motelId: ObjectId.isValid(room.idMotel) ? new ObjectId(room.idMotel) : null,
            statusCode: 9,
            indexRoom: room.index,
            data_Date: null,
            data_Time: null,
            create_at: new Date(),
            update_at: null
        }
        const resData = await this.inforRegisterHire.insertOne(
            dataInforRegisterHire
        );
        return resData;
    }
    async countAllRegisterHire(filter) {
        let filterUser = {};
        if (filter && filter.motelId) {
            filterUser = {
                motelId: ObjectId.isValid(filter.motelId) ? new ObjectId(filter.motelId) : null
            }
        }
        const cursor = await this.inforRegisterHire.count(filterUser);
        return cursor
    }
    async findInPageRegisterHire(page, quantityPage, filter) {
        let filterUser = {};
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage
        if (filter && filter.motelId) {
            filterUser = {
                motelId: ObjectId.isValid(filter.motelId) ? new ObjectId(filter.motelId) : null,
                statusCode: { $ne: 0 }
            }
        }
        if (filter && filter.userId) {
            filterUser = {
                userId: ObjectId.isValid(filter.userId) ? new ObjectId(filter.userId) : null,
                statusCode: { $ne: 0 }
            }
        }
        const cursor = await this.inforRegisterHire.aggregate([
            {
                $match: filterUser
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }, {
                $lookup:
                {
                    from: 'motel',
                    localField: 'motelId',
                    foreignField: '_id',
                    pipeline: [
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
                                    },
                                ],
                                as: 'priceEW',
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
                        }
                    ],
                    as: 'motel'
                }
            }], {
            skip: start,
            limit: quantity,
        }).sort({ _id: -1 });
        return cursor.toArray();
    }
    async updateSchedule(id, data, statusCode) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const cursor = await this.inforRegisterHire.updateOne(filter, {
            $set: {
                statusCode: statusCode,
                data_Date: data.data_Date,
                data_Time: data.data_Time,
                update_at: new Date()
            }
        })
        return cursor
    }
    async addHire(room, idUser) {
        let dataInforRegisterHire = {
            userId: ObjectId.isValid(idUser) ? new ObjectId(idUser) : null,
            roomId: ObjectId.isValid(room.roomId) ? new ObjectId(room.roomId) : null,
            motelId: ObjectId.isValid(room.motelId) ? new ObjectId(room.motelId) : null,
            statusCode: 4,
            indexRoom: room.index,
            create_at: new Date(),
            update_at: null
        }
        const resData = await this.inforHire.insertOne(
            dataInforRegisterHire
        );
        let filter = {
            _id: ObjectId.isValid(room.roomId) ? new ObjectId(room.roomId) : null,
        }
        if (resData && filter) {
            await this.Room.updateOne(filter, {
                $set: {
                    statusCode: 2
                }
            });
        }
        return resData;
    }
    async findInforHire(filter) {
        let filterUser = {};
        if (filter && filter.userId) {
            filterUser = {
                userId: ObjectId.isValid(filter.userId) ? new ObjectId(filter.userId) : null,
                statusCode: { $ne: 0 }
            }
        }
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let date = new Date().getUTCDate();
        let formatNumber = Intl.NumberFormat("es-Us", { minimumIntegerDigits: 2 })
        let time_at_pay = `${year}-${formatNumber.format(month)}-${formatNumber.format(date)}T00:00:00.000Z`;
        // let time_late_pay = `${year}-${formatNumber.format(month - 1)}-${formatNumber.format(date)}T00:00:00.000Z`;
        const cursor = await this.inforHire.aggregate([
            {
                $match: filterUser
            }, {
                $lookup:
                {
                    from: 'motel',
                    localField: 'motelId',
                    foreignField: '_id',
                    pipeline: [
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
                                    },
                                ],
                                as: 'priceEW',
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

                    ],
                    as: 'motel'
                },
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
                                date_end: { $gte: time_at_pay }

                            }
                        },
                        {
                            $sort: { _id: -1 }
                        }
                    ],
                    as: 'bills'
                }
            },
        ]);
        return cursor.toArray();
    }
    async createBill(bill) {
        let billClone = this.fillDataBill(bill);
        const resData = await this.Bill.insertOne(
            billClone
        );
        return resData;
    }

    async findBillById(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const cursor = await this.Bill.aggregate([
            {
                $match: filter
            },
            {

                $lookup:
                {
                    from: 'priceEW',
                    localField: 'priceEW',
                    foreignField: '_id',
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
        return await cursor.toArray();
    }
    async updateBill(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const cursor = await this.Bill.updateOne(filter, {
            $set: {
                statusCode: 6,
                date_pay: new Date()
            }
        })
        return cursor
    }
}
module.exports = RoomModel;