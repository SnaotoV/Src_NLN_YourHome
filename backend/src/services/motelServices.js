import MotelModel from "../models/motelModel";
import MongoDB from '../config/mongo.config';
import RoomModel from "../models/RoomModel";
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
let findOneMotel = async (id, type) => {
    let motel = {}
    if (id) {
        let Motel = new MotelModel(MongoDB.client);
        let motelData = await Motel.findById(id, type);
        motel = motelData;
    }
    return motel;
}
let updateMotel = async (motel) => {
    let resData = {}
    let Motel = new MotelModel(MongoDB.client);
    if (motel) {
        let data = await Motel.updateMotel(motel);
        if (data) {
            resData.errCode = 0;
            resData.value = "Cập nhật thông tin dãy trọ thành công";
        }
    }
    return resData
}

let removeMotel = async (id) => {
    let resData = {}
    let Room = new RoomModel(MongoDB.client);
    let Motel = new MotelModel(MongoDB.client);
    if (id) {
        let filter = {
            motelId: id
        }
        let inforHire = await Room.findInforHire(filter);
        if (inforHire.length === 0) {
            let motel = {
                _id: id,
                statusCode: 5
            }
            let data = await Motel.deleteMotel(motel);
            if (data) {
                resData.errCode = 0;
                resData.value = 'Xóa dãy trọ thành công';
            }
        }
        else {
            resData.errCode = 1;
            resData.value = 'Dãy trọ vẫn còn người ở vui lòng kết thúc các hợp đồng còn lại trước khi dừng kinh doanh';
        }
    }
    return resData;
}

module.exports = { createMotel, findOneMotel, updateMotel, removeMotel }