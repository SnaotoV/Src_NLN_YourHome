import ApiError from "../api-error";
import motelService from '../services/motelServices';
let findAll = (req, res) => {
    console.log('hello');
}
let findOneFromUser = async (req, res) => {
    try {
        let id = req.params.id;
        let type = req.params.type;
        let resData = await motelService.findOneMotel(id, type);
        return res.status(200).json({
            data: resData[0]
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}


let create = async (req, res) => {
    try {
        let motel = req.body.data;
        let resFromServices = await motelService.createMotel(motel);
        return res.status(200).json({
            errCode: resFromServices.errCode,
            value: resFromServices.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}


let update = async (req, res) => {
    try {
        let motel = req.body.motel;
        let resFromServices = await motelService.updateMotel(motel);
        return res.status(200).json({
            errCode: resFromServices.errCode,
            value: resFromServices.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let deleteMotel = async (req, res) => {
    try {
        let motel = req.params.id;
        let resFromServices = await motelService.removeMotel(motel);
        return res.status(200).json({
            errCode: resFromServices.errCode,
            value: resFromServices.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}



module.exports = {
    findAll,
    findOneFromUser,
    create,
    update,
    deleteMotel,
}