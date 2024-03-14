import MongoDB from '../config/mongo.config';
import UserModel from '../models/usersModel';
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
        let UserData = await User.findByUsername(user, {});
        if (UserData) {
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

module.exports = {
    registerService: registerService,
    loginService: loginService
}