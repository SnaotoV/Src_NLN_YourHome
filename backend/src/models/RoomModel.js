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
            motelId: ObjectId.isValid(bill.motelId) ? new ObjectId(bill.motelId) : null,
            roomId: ObjectId.isValid(bill.roomId) ? new ObjectId(bill.roomId) : null,
            userPayId: ObjectId.isValid(bill.userPayId) ? new ObjectId(bill.userPayId) : null,
            valueE: bill.valueE,
            valueW: bill.valueW,
            priceEW: ObjectId.isValid(bill.priceEW) ? new ObjectId(bill.priceEW) : null,
            price: bill.price,
            sumBill: bill.sumBill,
            sumHire: bill.sumHire,
            eBill: bill.eBill,
            wBill: bill.wBill,
            hireId: ObjectId.isValid(bill.hireId) ? new ObjectId(bill.hireId) : null,
            typePayment: bill.typePayment ? bill.typePayment : null,
            time_start: bill.time_start,
            time_end: bill.time_end,
            date_pay: bill.date_pay,
            create_at: new Date(bill.create_at),
            update_at: new Date(bill.update_at),
            statusCode: bill.statusCode
        }
        Object.keys(billClone).forEach(
            (key) => billClone[key] === undefined && delete billClone[key]
        )
        return billClone;
    }
    fillDataHire(hire) {
        let hireClone = {
            userId: ObjectId.isValid(hire.userId) ? new ObjectId(hire.userId) : null,
            roomId: ObjectId.isValid(hire.roomId) ? new ObjectId(hire.roomId) : null,
            motelId: ObjectId.isValid(hire.motelId) ? new ObjectId(hire.motelId) : null,
            indexRoom: hire.indexRoom,
            create_at: hire.create_at,
            update_at: hire.update_at,
            statusCode: hire.statusCode ? hire.statusCode : 4
        }
        Object.keys(hireClone).forEach(
            (key) => (hireClone[key] === undefined || hireClone[key] === null) && delete hireClone[key]
        )
        return hireClone;
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
        if (filter && filter.userId) {
            filterUser = {
                userId: ObjectId.isValid(filter.userId) ? new ObjectId(filter.userId) : null
            }
        }

        const cursor = await this.inforRegisterHire.count(filterUser);
        return cursor
    }
    async findInPageRegisterHire(page, quantityPage, filter) {
        let filterUser = {};
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage;
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
                },

            },
            {
                $skip: start,
            },
            {
                $limit: quantity,
            },
            {
                $sort: { _id: -1 },
            }
        ]);
        return cursor.toArray();
    }
    async updateSchedule(id, data, statusCode) {
        let filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        }
        const cursor = await this.inforRegisterHire.updateOne(filter, {
            $set: {
                statusCode: statusCode,
                data_Date: data.data_Date ? data.data_Date : null,
                data_Time: data.data_Time ? data.data_Time : null,
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
    async findInforHirebyId(filter) {
        let filterUser = {};

        if (filter) {
            filterUser._id = ObjectId.isValid(filter._id) ? new ObjectId(filter._id) : null

        }

        // let month = new Date().getMonth() + 1;
        // let year = new Date().getFullYear();
        // let date = new Date().getUTCDate();
        // let formatNumber = Intl.NumberFormat("es-Us", { minimumIntegerDigits: 2 })
        // let time_at_pay = `${year}-${formatNumber.format(month)}-${formatNumber.format(date)}T00:00:00.000Z`;
        // let time_late_pay = `${year}-${formatNumber.format(month - 1)}-${formatNumber.format(date)}T00:00:00.000Z`;
        const cursor = await this.inforHire.aggregate([
            {
                $match: filterUser
            },
            {
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
                                date_pay: null

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
    async findInforHire(filter) {
        let filterUser = {};

        if (filter) {
            filterUser = this.fillDataHire(filter);
        }
        if (filterUser.statusCode === "all") {
            delete filterUser.statusCode;
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
                                date_pay: null

                            }
                        },
                        {
                            $sort: { _id: -1 }
                        }
                    ],
                    as: 'bills'
                }
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userHire'
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
                    as: 'priceEW',
                }
            },
        ]);
        return await cursor.toArray();
    }
    async findBillByFilter(filter) {

        let editFilter = {};
        editFilter = filter;

        const cursor = await this.Bill.aggregate([
            {
                $match: editFilter
            },
            {

                $lookup:
                {
                    from: 'priceEW',
                    localField: 'priceEW',
                    foreignField: '_id',
                    as: 'priceEW',
                }
            },
        ]);
        return await cursor.toArray();
    }
    async countAllBill(filter) {
        let cursor = [];
        const editFilter = {};
        if (filter.hireId) {
            editFilter.hireId = new ObjectId(filter.hireId)
        }
        if (filter.userId) {
            editFilter.userPayId = new ObjectId(filter.userId)
        }
        cursor = await this.Bill.count(editFilter);
        return cursor
    }
    async findBillInPage(page, quantityPage, filter) {
        let start = (page - 1) * quantityPage;
        let quantity = quantityPage
        let cursor = [];

        const editFilter = {};
        if (filter.hireId) {
            editFilter.hireId = new ObjectId(filter.hireId)
        }
        if (filter.userId) {
            editFilter.userPayId = new ObjectId(filter.userId)
        }
        if (filter.roomId) {
            editFilter.roomId = new ObjectId(filter.roomId)
        }



        cursor = await this.Bill.aggregate([{ $match: editFilter }, {
            $lookup:
            {
                from: 'motel',
                localField: 'motelId',
                foreignField: '_id',
                as: 'motel',
            }
        },
        {
            $skip: start,
        },
        {
            $limit: quantity,
        },
        {
            $sort: { _id: -1 },
        }])

        return cursor.toArray();
    }
    async updateBill(id, type, userPayId) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        let cursor;
        if (type === "moneyPay") {
            cursor = await this.Bill.updateOne(filter, {
                $set: {
                    typePayment: "money",
                    statusCode: 11,
                }
            })
        }
        if (type === "livePay") {
            cursor = await this.Bill.updateOne(filter, {
                $set: {
                    typePayment: "money",
                    statusCode: 6,
                    date_pay: new Date(),
                }
            })
        }
        if (type === "VNPay") {
            cursor = await this.Bill.updateOne(filter, {
                $set: {
                    typePayment: "VNPay",
                    statusCode: 6,
                    date_pay: new Date(),
                }
            })
        }
        return cursor
    }
    async getMonneyMonthInYear(filter) {
        const editFilter = { statusCode: 6 };
        const data = Array(12).fill(0);

        if (filter && filter.year) {
            const year = filter.year; // Lấy năm từ filter
            editFilter.date_pay = {
                $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                $lt: new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`)
            }
            if (filter.motelId) {
                editFilter.motelId = ObjectId.isValid(filter.motelId) ? new ObjectId(filter.motelId) : null;
            }
            if (filter.roomId) {
                editFilter.roomId = ObjectId.isValid(filter.roomId) ? new ObjectId(filter.roomId) : null;
            }
        }

        const rawData = await this.Bill.aggregate([
            {
                $match: editFilter
            },
            {
                $group: {
                    _id: { month: { $month: "$create_at" } },
                    totalSumBill: { $sum: "$sumBill" }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ])
        await rawData.forEach(item => {
            const monthIndex = item._id.month - 1; // MongoDB trả về tháng từ 1-12, cần trừ 1 để đúng chỉ mục mảng
            data[monthIndex] = item.totalSumBill;
        });


        return data
    }
    async removeHire(filter) {
        const filterClone = this.fillDataHire(filter)
        if (filter?._id) {
            filterClone._id = ObjectId.isValid(filter?._id) ? new ObjectId(filter?._id) : null
        }
        const HireData = await this.inforHire.find(filterClone).toArray();
        const cursor = await this.inforHire.updateOne(filterClone, {
            $set: {
                statusCode: 0,
                update_at: new Date()
            }
        })
        if (cursor && HireData.length > 0) {
            let filterRoom = {
                _id: ObjectId.isValid(HireData[0].roomId) ? new ObjectId(HireData[0].roomId) : null,
            }
            const dataRoom = await this.Room.updateOne(filterRoom, {
                $set: {
                    statusCode: 1,
                    update_at: new Date()
                }
            })
        }
        return cursor;
    }
    async findOneRoomById(id) {

        let filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        let cursor = this.Room.aggregate([{ $match: filter },
        {
            $lookup:
            {
                from: 'motel',
                localField: 'idMotel',
                foreignField: '_id',
                as: 'motel'
            },
        },
        ])
        return cursor.toArray()
    }
    async removeHireByMotel(filter) {
        let cloneFilter = this.fillDataHire(filter);
        const cursor = await this.inforHire.updateMany(cloneFilter, {
            $set: {
                statusCode: 0
            },
        })
        return cursor;
    }
}
module.exports = RoomModel;