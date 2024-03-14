import axios from "../axios";

let register = (user) => {
    return axios.post('/register', { user });
}
let login = (user) => {
    return axios.post('/login', { user });
}

export {
    register,
    login
}