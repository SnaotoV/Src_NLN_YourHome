import ApiError from "../api-error";
import MongoDB from "../config/mongo.config";
import appService from '../services/appService';

let register = async (req, res) => {
    try {
        let user = req.body.user;
        let resService = appService.registerService(user);
        return res.status(200).json({
            data: resService
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let login = (req, res) => {
    try {
        console.log('hello');
        return res.send("hello")
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

module.exports = {
    register,
    login
}