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
let editSchedule = async (id, data) => {
    let resData = {};
    let Room = new RoomModel(MongoDB.client);
    if (id && data) {
        let newRegisterHire = await Room.updateSchedule(id, data, 8);
        if (newRegisterHire) {
            resData.errCode = 0;
            resData.value = 'Hẹn lịch lên phòng thành công';
        }

    }
    return resData
}
module.exports = {
    addHire,
    editSchedule
}