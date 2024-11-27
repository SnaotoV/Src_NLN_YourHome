import axios from "../axios";

let register = (user) => {
    return axios.post('/register', { user });
}
let login = (user) => {
    return axios.post('/login', { user });
}
let getQuantityPage = (type, limit, filter) => {
    return axios.post('/app/all-page', { type, limit, filter });
}
let getDataInPage = (type, page, limit, filter) => {
    return axios.put(`app/${type}/${page}`, { filter, limit });
}
let getNewToken = async () => {
    let data = await axios.get('/app/auth/token')
    if (data.data.errCode = 400) {
        localStorage.setItem('persist:user_YourHome', { "isLoggedIn": "false", "userInfor": "null", "_persist": "{\"version\":-1,\"rehydrated\":true}" });
        localStorage.removeItem('accessToken');
        window.location = "http://localhost:3000/";
    }
    else {
        localStorage.setItem('accessToken', data.token);
        return data ? 1 : 0;
    }
}
let createPayController = async (amount, orderDescription) => {
    return axios.post('/create_payment_url', { amount, orderDescription });
}
let getCountMotel = (filter) => {
    return axios.post(`/Admin/Count/Motel`, { filter });
}
export {
    register,
    login,
    getQuantityPage,
    getDataInPage,
    getNewToken,
    createPayController,
    getCountMotel

}