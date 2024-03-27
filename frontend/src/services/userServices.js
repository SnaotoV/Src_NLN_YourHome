import axios from "../axios";

let edit = (id, user) => {
    return axios.put(`/user/${id}`, { user });
}

let addMotel = (data) => {
    return axios.post('/user/motel', { data });
}

let getMotel = (id) => {
    return axios.get(`/user/motel/${id}`);
}

export {
    edit,
    addMotel,
    getMotel
}