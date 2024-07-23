import axios from "axios";

const instance = axios.create({
    baseURL: "https://tasksmanager-gilt.vercel.app",
    withCredentials: true,
});

export default instance;