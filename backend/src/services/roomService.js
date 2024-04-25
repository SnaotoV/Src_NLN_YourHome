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
        let motelClone = {
            userId: user._id,
        }
        let InforHire = await Room.findInforHire(motelClone);
        if (InforHire.length === 0) {
            let newInforHire = await Room.addHire(motel, user._id);
            if (newInforHire) {
                await Room.updateSchedule(motel._id, motel, 0);
                resData.errCode = 0;
                resData.value = 'Xác nhận thuê thành công!';
            }
        }
        else {
            resData.errCode = 1;
            resData.value = 'Bạn đã có một hợp đồng trước đó vui lòng kết thúc hợp đồng để bắt đầu một hợp đồng mới!';

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
    console.log(resData);
    return resData;
}
let createBill = async (bill) => {
    let resData = {};
    let Room = new RoomModel(MongoDB.client);
    if (bill) {
        let data = await Room.createBill(bill);
        if (data) {
            resData.errCode = 0;
            resData.value = 'Thêm phiếu thu tiền thành công!';
        }
        else {
            resData.errCode = 1;
            resData.value = 'Thêm phiếu thu tiền không thành công!';
        }
    }
    else {
        resData.errCode = 3;
        resData.value = 'Có lỗi xảy ra không nhận được bill!';
    }
    return resData;
}
let getBillId = async (id) => {
    let Room = new RoomModel(MongoDB.client);
    let resData = {};
    if (id) {
        resData = await Room.findBillById(id);
    }
    return resData
}
let updateBill = async (id) => {
    let Room = new RoomModel(MongoDB.client);
    let resData = {};
    if (id) {
        let data = await Room.updateBill(id);
        if (data) {
            resData.errCode = 0;
            resData.value = 'Thanh toán thành công!'
        }
        else {
            resData.errCode = 1;
            resData.value = 'Có lỗi xảy ra!'
        }
    }
    return resData
}
let deleteRegister = async (id) => {
    let resData = {};
    let Room = new RoomModel(MongoDB.client);
    if (id) {
        let motel = {
            _id: id
        }
        let data = await Room.updateSchedule(motel._id, motel, 0);
        if (data) {
            resData.errCode = 0;
            resData.value = 'Xác nhận không thuê phòng thành công'
        }
        else {
            resData.errCode = 1;
            resData.value = 'Có lỗi xảy ra!'
        }
    }
    return resData
}

let deleteHire = async (id) => {
    let resData = {};
    let Room = new RoomModel(MongoDB.client);
    if (id) {
        let cloneHire = {
            _id: id,
            statusCode: 0,
        }
        let data = await Room.removeHire(cloneHire);
        if (data) {
            resData.errCode = 0;
            resData.value = 'Xác nhận hủy hợp đồng thành công'
        }
        else {
            resData.errCode = 1;
            resData.value = 'Có lỗi xảy ra!'
        }
    }
    return resData
}
module.exports = {
    addHire,
    editSchedule,
    createHireInfor,
    findInforHire,
    createBill,
    getBillId,
    updateBill,
    deleteRegister,
    deleteHire
}