import axios from "../axios";

let edit = (id, user) => {
    return axios.put(`/user/${id}`, { user });
}

let addMotel = (data) => {
    return axios.post('/user/motel', { data });
}

let getMotel = (id, idUser) => {
    return axios.get(`/user/motel/${idUser}/${id}`);
}

export {
    edit,
    addMotel,
    getMotel
}