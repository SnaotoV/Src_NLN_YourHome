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
        let type = req.body.type;
        let resData = await roomService.editSchedule(id, data, type);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}

let createHire = async (req, res) => {
    try {
        let motel = req.body.motel;
        let user = req.body.user;
        let resData = await roomService.createHireInfor(motel, user);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let findOneRoom = async (req, res) => {
    try {
        let filter = req.body.filter;
        let resData = await roomService.findInforHire(filter);

        return res.status(200).json({
            resData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let findAllDataRoom = async (req, res) => {
    try {
        let id = req.params.id;
        let resData = await roomService.findDataRoom(id);
        return res.status(200).json({
            resData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let addBill = async (req, res) => {
    try {
        let bill = req.body.bill;
        let resFromServices = await roomService.createBill(bill);
        return res.status(200).json({
            errCode: resFromServices.errCode,
            value: resFromServices.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let findBill = async (req, res) => {
    try {
        let id = req.params.id;
        let resData = await roomService.getBillId(id);
        return res.status(200).json({
            resData
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let updateBill = async (req, res) => {
    try {
        let id = req.params.id;
        let type = req.body.type;
        let userPayId = req.body.userPayId;

        let resData = await roomService.updateBill(id, type, userPayId);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let deleteRegister = async (req, res) => {
    try {
        let id = req.params.id;
        let resData = await roomService.deleteRegister(id);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let deleteHire = async (req, res) => {
    try {
        let id = req.params.id;
        let resData = await roomService.deleteHire(id);
        return res.status(200).json({
            errCode: resData.errCode,
            value: resData.value
        })
    } catch (error) {
        new ApiError(500, "An error orrcured while retrieving the contacts")
    }
}
let getBillInYear = async (req, res) => {
    try {
        let id = req.params.id;
        let filter = req.body.filter;
        let editFilter = {
            motelId: id,
            ...filter
        }

        let resData = await roomService.getAllCheck(editFilter);
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
    editRegisterRoom,
    createHire,
    findOneRoom,
    addBill,
    findBill,
    updateBill,
    deleteRegister,
    deleteHire,
    getBillInYear,
    findAllDataRoom
}