import axios from "axios";

const instance = axios.create({
    baseURL: "https://task-manager-mongodb.vercel.app/api",
    withCredentials: true,
});

export default instance;