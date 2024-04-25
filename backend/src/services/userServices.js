import MongoDB from '../config/mongo.config';
import UserModel from '../models/usersModel';
import MotelModel from "../models/motelModel";
import RoomModel from '../models/RoomModel';


let updateInforUser = async (id, user) => {
    let resData = {}
    if (id && user) {
        let User = new UserModel(MongoDB.client);
        let data = await User.updated(id, user)
        if (data) {
            let userInfor = await User.findByID(id);
            resData.errCode = 0;
            resData.value = 'Cập nhật thông tin người dùng thành công';
            resData.userInfor = userInfor[0];
            delete resData.userInfor.password;
        }
        else {
            resData.errCode = 1;
            resData.value = 'có lỗi xảy ra! Cập nhật không thành công';
        }
    }
    else {
        resData.errCode = 2;
        resData.value = 'có lỗi xảy ra! Không nhận được thông tin người dùng';
    }
    return resData;
}

let removeOneUser = async (id) => {
    let resData = {}
    if (id) {
        let userData = {
            statusCode: 0
        }
        let User = new UserModel(MongoDB.client);
        let Motel = new MotelModel(MongoDB.client);
        let Room = new RoomModel(MongoDB.client);
        let data = await User.updated(id, userData);
        let userIdClone = {
            userId: id
        }
        let hireData = await Room.removeHire(userIdClone);
        if (data) {
            let motelData = {
                userId: id
            }
            let resMotel = await Motel.deleteByUser(motelData);
            if (resMotel && resMotel.length > 0) {
                await resMotel.forEach(async (e) => {
                    let cloneDataHire = {
                        motelId: e._id
                    }
                    await Room.removeHireByMotel(cloneDataHire);
                });
            }
            resData.errCode = 0;
            resData.value = 'Xóa người dùng thành công'
        }
    }
    return resData
}


module.exports = {
    updateInforUser,
    removeOneUser
}