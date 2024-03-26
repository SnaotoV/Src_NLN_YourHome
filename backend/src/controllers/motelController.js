import ApiError from "../api-error";
import motelService from '../services/motelServices';
let findAll = (req, res) => {
    console.log('hello');
}
let findOne = (req, res) => {
    console.log('hello');
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


let update = (req, res) => {
    console.log('hello');
}

module.exports = {
    findAll,
    findOne,
    create,
    update
}