import axios from "../axios";

let register = (user) => {
    return axios.post('/register', { user });
}
let login = (user) => {
    return axios.post('/login', { user });
}
let getQuantityPage = (type, limit) => {
    return axios.post('/app/all-page', { type, limit });
}
let getDataInPage = (type, page) => {
    return axios.get(`app/${type}/${page}`);
}
export {
    register,
    login,
    getQuantityPage,
    getDataInPage
}