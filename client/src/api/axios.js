import axios from "axios";

const instance = axios.create({
    baseURL: "https://tasksmanager-gilt.vercel.app/api",
    withCredentials: true,
});

export default instance;