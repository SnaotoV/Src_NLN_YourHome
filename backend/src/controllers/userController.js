import ApiError from "../api-error";
import MongoDB from "../config/mongo.config";
import userServices from '../services/userServices'
let findAll = (req, res) => {
    try {
        console.log('hello');
        return res.send("hello")
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let create = (req, res) => {
    console.log('hello');
}
let deleteAll = (req, res) => {
    console.log('hello');
}
let findOne = (req, res) => {
    console.log('hello');
}
let update = async (req, res) => {
    let user = req.body.user;
    let userLogin = req.body.userLogin;
    let id = req.params.id;
    let resService = await userServices.updateInforUser(id, user, userLogin)
    return res.status(200).json({
        errCode: resService.errCode,
        value: resService.value,
        userInfor: resService.userInfor ? resService.userInfor : ''

    })
}
let deleteUser = (req, res) => {
    console.log('hello');
}

module.exports = {
    findAll,
    create,
    deleteAll,
    findOne,
    update,
    deleteUser
}