import axios from "../axios";

let edit = (id, user) => {
    return axios.put(`/user/${id}`, { user });
}

let addMotel = (data) => {
    return axios.post('/user/motel', { data });
}

let getMotel = (id, idUser, type) => {
    return axios.get(`/user/motel/${type}/${idUser}/${id}`);
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
export {
    edit,
    addMotel,
    getMotel,
    registerRoom,
    updateSchedule,
    hireRoom
}