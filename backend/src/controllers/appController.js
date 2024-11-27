import ApiError from "../api-error";
import appService from '../services/appService';
import auth from '../services/auth';

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
        if (resService) {
            let token = auth.generateToken(resService.userData);
            let refreshToken = auth.generateRefreshToken(resService.userData);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
            });

            return res.status(200).json({
                errCode: resService.errCode,
                value: resService.value,
                userData: resService.userData,
                token: token,
            })
        }
        else {
            return res.status(200).json({
                errCode: resService.errCode,
                value: resService.value,
            })
        }
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let allpage = async (req, res) => {
    try {
        let type = req.body.type;
        let limit = req.body.limit;
        let filter = req.body.filter;
        let resService = await appService.getAllPage(type, limit, filter);
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
        let filter = req.body.filter;
        let limit = req.body.limit;
        let resData = await appService.getDataInPage(type, page, limit, filter);
        return res.status(200).json({
            data: resData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let getNewKey = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let data = await auth.getNewToken(refreshToken);
    if (data.errCode = 0) {
        res.cookie('refreshToken', data.newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
        });
    }
    return res.status(200).json({
        data
    });



}
let getStatistical = async (req, res) => {
    try {
        let filter = req.body.filter;

        let resFromServices = await appService.getStatisticalFromAdmin(filter);
        return res.status(200).json({
            errCode: resFromServices.errCode,
            value: resFromServices.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
module.exports = {
    register,
    login,
    allpage,
    dataInPage,
    getNewKey,
    getStatistical
}