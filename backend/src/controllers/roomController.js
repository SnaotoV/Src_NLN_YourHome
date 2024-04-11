import ApiError from "../api-error";
import roomService from '../services/roomService';
let registerRoom = async (req, res) => {
    try {
        let room = req.body.room;
        let user = req.body.user;
        let resData = await roomService.addHire(room, user);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let editRegisterRoom = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body.data;
        let resData = await roomService.editSchedule(id, data);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
module.exports = {
    registerRoom,
    editRegisterRoom
}