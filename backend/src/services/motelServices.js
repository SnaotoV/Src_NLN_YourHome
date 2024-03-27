import MotelModel from "../models/motelModel";
import MongoDB from '../config/mongo.config';

let createMotel = async (data) => {
    let resData = {};
    if (data) {
        let Motel = new MotelModel(MongoDB.client);
        let newMotel = await Motel.create(data);
        if (newMotel) {
            resData.errCode = 0;
            resData.value = 'Thêm dãy trọ thành công!'
        }
        else {
            resData.errCode = 1;
            resData.value = 'Có lỗi xảy ra thêm dãy trọ thất bại!'
        }
    }
    return resData;
}
let findOneMotel = async (id) => {
    if (id) {
        let Motel = new MotelModel(MongoDB.client);
        let motelData = MotelModel.findByID(id);
    }
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
}
let findAllOneMotel = async (id) => {
    if (id) {
        let Motel = new MotelModel(MongoDB.client);
        let motelData = MotelModel.findByID(id);
    }
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
}

module.exports = { createMotel, findOneMotel }