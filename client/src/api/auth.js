import axios from "./axios";

export const registerRequest = async (user) => {
    const response = await axios.post(`/register`, user);
    return response.data;
}

export const loginRequest = async (user) => {
    const response = await axios.post(`/login`, user);
    return response.data;
}

export const verifyTokenRequest = async () => {
    const response = await axios.get(`/verify`);
    return response.data;
}
