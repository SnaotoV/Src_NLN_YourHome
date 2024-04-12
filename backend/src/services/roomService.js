import MongoDB from '../config/mongo.config';
import RoomModel from '../models/RoomModel';

let addHire = async (room, user) => {
    let resData = {};
    let Room = new RoomModel(MongoDB.client);
    if (room && user) {
        let checkExistData = await Room.findRegisterHire(room, user._id);
        if (checkExistData.length == 0) {
            let newRegisterHire = await Room.addRegister(room, user._id);
            if (newRegisterHire) {
                resData.errCode = 0;
                resData.value = 'Hẹn lịch xem phòng thành công! Xin vui lòng đợi chủ dãy trọ duyệt';
            }
        }
        else {
            resData.errCode = 1;
            resData.value = 'Bạn đã hẹn lịch xem phòng ở dãy trọ này trước đó! Xin vui lòng đợi chủ dãy trọ duyệt';

        }
    }
    return resData
}
let editSchedule = async (id, data, type) => {
    let resData = {};
    if (type === "Cancel") {
        let Room = new RoomModel(MongoDB.client);
        if (id && data) {
            let newRegisterHire = await Room.updateSchedule(id, data, 0);
            if (newRegisterHire) {
                resData.errCode = 0;
                resData.value = 'Hủy lịch hẹn thành công';
            }

        }
    } else if (type === "Contact" || type === "success") {
        let Room = new RoomModel(MongoDB.client);
        if (id && data) {
            let newRegisterHire = await Room.updateSchedule(id, data, 10);
            if (newRegisterHire) {
                resData.errCode = 0;
                resData.value = 'Vui lòng liên hệ với chủ sở hữu theo số điện thoại';
            }

        }
    } else {
        let Room = new RoomModel(MongoDB.client);
        if (id && data) {
            let newRegisterHire = await Room.updateSchedule(id, data, 8);
            if (newRegisterHire) {
                resData.errCode = 0;
                resData.value = 'Hẹn lịch lên phòng thành công';
            }

        }
    }
    return resData
}

let createHireInfor = async (motel, user) => {
    let resData = {}
    let Room = new RoomModel(MongoDB.client);
    if (motel && user) {
        let newInforHire = await Room.addHire(motel, user._id);
        if (newInforHire) {
            await Room.updateSchedule(motel._id, motel, 0);
            resData.errCode = 0;
            resData.value = 'Xác nhận thuê thành công!';
        }
    }
    return resData;
}

let findInforHire = async (filter) => {
    let resData = {}
    let Room = new RoomModel(MongoDB.client);
    if (filter) {
        resData = await Room.findInforHire(filter);
    }
    return resData;
}
module.exports = {
    addHire,
    editSchedule,
    createHireInfor,
    findInforHire
}