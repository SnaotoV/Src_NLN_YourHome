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
let getDataInPage = (type, page, filter) => {
    return axios.put(`app/${type}/${page}`, { filter });
}
export {
    register,
    login,
    getQuantityPage,
    getDataInPage
}