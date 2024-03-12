import ApiError from "../api-error";
import MongoDB from "../config/mongo.config";

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
let update = (req, res) => {
    console.log('hello');
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