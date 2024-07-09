import axios from "axios";

const API = 'http://localhost:4000/api';

export const registerRequest = async (user) => {
    const response = await axios.post(`${API}/register`, user);
    return response.data;
}

export const loginRequest = async (user) => {
    const response = await axios.post(`${API}/login`, user);
    return response.data;
}
