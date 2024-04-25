import axios from "../axios";

let edit = (id, user) => {
    return axios.put(`/user/${id}`, { user });
}

let addMotel = (data) => {
    return axios.post('/user/motel', { data });
}

let getMotel = (id, type) => {
    return axios.get(`/user/motel/${type}/${id}`);
}

let registerRoom = (room, user) => {
    return axios.post(`/user/room`, { room, user });
}

let updateSchedule = (data, type) => {
    return axios.put(`/user/room/${data._id}`, { data, type });
}

let hireRoom = (motel, user) => {
    return axios.post('/user/hire', { motel, user });
}
let findInforHire = (filter) => {
    return axios.post(`/hire`, { filter });
}
let removeInforHire = (id) => {
    return axios.delete(`/hire/${id}`);
}
let createBill = (bill) => {
    return axios.post(`/create/bill`, { bill });
}
let getBillById = (id) => {
    return axios.get(`/pay/${id}`);
}
let updateBill = (id) => {
    return axios.put(`/pay/${id}`);
}
let updateMotel = (type, motel) => {
    return axios.put(`/user/motel/${type}/${motel._id}`, { motel });
}
let deleteMotel = (type, motel) => {
    return axios.delete(`/user/motel/${type}/${motel._id}`);
}
let noneHire = (motel) => {
    return axios.delete(`/user/hire/${motel._id}`);
}
let deleteUser = (id) => {
    return axios.delete(`/user/${id}`);
}
export {
    edit,
    addMotel,
    getMotel,
    registerRoom,
    updateSchedule,
    hireRoom,
    findInforHire,
    createBill,
    getBillById,
    updateBill,
    updateMotel,
    deleteMotel,
    noneHire,
    removeInforHire,
    deleteUser
}