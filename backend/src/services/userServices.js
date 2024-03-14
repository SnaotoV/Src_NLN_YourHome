import MongoDB from '../config/mongo.config';
import UserModel from '../models/usersModel';


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

module.exports = {
    updateInforUser
}