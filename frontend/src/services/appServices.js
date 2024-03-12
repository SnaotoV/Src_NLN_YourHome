import axios from "../axios";

let register = (user) => {
    return axios.post('/register', { user });
}

export {
    register
}