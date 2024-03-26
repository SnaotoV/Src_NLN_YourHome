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

let allpage = async (req, res) => {
    try {
        let type = req.body.type;
        let limit = req.body.limit;

        let resService = await appService.getAllPage(type, limit);
        return res.status(200).json({
            quantityPage: resService
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let dataInPage = async (req, res) => {
    try {

        let type = req.params.type;
        let page = req.params.page;
        let resData = await appService.getDataInPage(type, page);
        return res.status(200).json({
            data: resData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
module.exports = {
    register,
    login,
    allpage,
    dataInPage
}