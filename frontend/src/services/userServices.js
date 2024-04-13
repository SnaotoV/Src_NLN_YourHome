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
export {
    edit,
    addMotel,
    getMotel,
    registerRoom,
    updateSchedule,
    hireRoom,
    findInforHire
}