import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// const instance = axios.create({
//     baseURL: "http://localhost:4000/api",
//     withCredentials: true,
// });

const instance = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true,
});


export default instance;