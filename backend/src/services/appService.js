import MongoDB from '../config/mongo.config';
import UserModel from '../models/usersModel';
import MotelModel from '../models/motelModel';
import RoomModel from '../models/RoomModel';
let registerService = async (user) => {
    let resData = {};
    if (user) {
        let User = new UserModel(MongoDB.client);
        let checkUserExist = await User.checkUserExist(user);
        if (!checkUserExist) {
            let data = User.create(user);
            if (data) {
                resData.errCode = 0;
                resData.value = "Đăng ký thành công";
            }
        }
        else {
            resData.errCode = 1;
            resData.value = "tên người dùng đã tồn tại";
        }
    }
    return resData
}

let loginService = async (user) => {
    let resData = {};
    if (user) {
        let User = new UserModel(MongoDB.client);
        let UserData = await User.findByUsername(user);

        if (UserData.length > 0) {
            resData.errCode = 0;
            resData.value = 'Đăng nhập thành công';
            resData.userData = UserData[0];
            delete resData.userData.password;
        }
        else {
            resData.errCode = 1;
            resData.value = 'Sai tài khoản hoặc mật khẩu';
            resData.userData = {};
        }
    }
    return resData
}

let getAllPage = async (type, limit, filter) => {
    let quantityPage = 1;
    if (type == 'motel') {
        let Motel = new MotelModel(MongoDB.client);
        let quantityMotel = await Motel.countAll(filter);
        quantityPage = Math.ceil(quantityMotel / limit);
    }
    if (type == 'registerHire') {
        let Room = new RoomModel(MongoDB.client);
        let quantityMotel = await Room.countAllRegisterHire(filter);
        quantityPage = Math.ceil(quantityMotel / limit);
    }
    if (type == 'motel-home') {

        let Room = new RoomModel(MongoDB.client);
        let quantityMotel = await Room.countAllRegisterHire(filter);
        quantityPage = Math.ceil(quantityMotel / limit);
    }
    if (type == 'user') {
        let User = new UserModel(MongoDB.client);
        let quantityMotel = await User.countAll(filter);
        quantityPage = Math.ceil(quantityMotel / limit);
    }
    if (type == 'bill') {
        let Room = new RoomModel(MongoDB.client);
        let quantityBill = await Room.countAllBill(filter);
        quantityPage = Math.ceil(quantityBill / limit);

    }
    return quantityPage
}
let getDataInPage = async (type, page, limit, filter) => {
    if (type == 'motel') {
        let Motel = new MotelModel(MongoDB.client);
        let quantityMotel = await Motel.findInPage(page, limit, filter);
        return quantityMotel;
    }
    if (type == 'motel-home') {
        let Motel = new MotelModel(MongoDB.client);
        let quantityMotel = await Motel.findInPage(page, 4, filter);
        return quantityMotel;
    }
    if (type == 'registerHire' && Object.keys(filter).length !== 0) {
        let Room = new RoomModel(MongoDB.client);
        let quantityMotel = await Room.findInPageRegisterHire(page, limit, filter);
        return quantityMotel;
    }
    if (type == 'user') {
        let User = new UserModel(MongoDB.client);
        let quantityMotel = await User.findInPage(page, limit, filter);
        quantityMotel.forEach(element => {
            delete element.password;
        });
        return quantityMotel;
    }
    if (type == 'bill') {
        let Room = new RoomModel(MongoDB.client);
        let quantityBill = await Room.findBillInPage(page, limit, filter);
        return quantityBill;
    }
}
let getStatisticalFromAdmin = async (filter) => {

    let resData = {};
    let value = {};
    let User = new UserModel(MongoDB.client);
    let Motel = new MotelModel(MongoDB.client);
    let Room = new RoomModel(MongoDB.client);
    let quantityUserNow = await User.countAll({ statusCode: 4 });
    let quantityUserDelete = await User.countAll({ statusCode: 0 });
    let quantityMotelNow = await Motel.countAll({ statusCode: 4 });
    let quantityMotelDelete = await Motel.countAll({ statusCode: 0 });
    value.PieMotel = [quantityMotelDelete, quantityMotelNow];
    value.PieUser = [quantityUserDelete, quantityUserNow];
    value.BarAllMotel = await Room.getMonneyMonthInYear(filter);
    resData.value = value;

    return resData;
}
module.exports = {
    registerService,
    loginService,
    getAllPage,
    getDataInPage,
    getStatisticalFromAdmin
}