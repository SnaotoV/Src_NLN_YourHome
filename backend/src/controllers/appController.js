import ApiError from "../api-error";
import appService from '../services/appService';

let register = async (req, res) => {
    try {
        let user = req.body.user;
        let resService = await appService.registerService(user);
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let login = async (req, res) => {
    try {
        let user = req.body.user;
        let resService = await appService.loginService(user);
        return res.status(200).json({
            errCode: resService.errCode,
            value: resService.value,
            userData: resService.userData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

module.exports = {
    register,
    login
}