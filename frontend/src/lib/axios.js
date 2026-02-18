//axios lets my frontend talk to backend orother server asi ally it helps me make htttp mistake s

//https://slack-backend-lemon.vercel.app/
import axios from "axios";
const BASE_URL = import.meta.env.MODE === 'development' 
? "http://localhost:5001/api"
: "https://slack-backend-lemon.vercel.app/api";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers:{
        "Content-Type": "application/json",
    },
})

export default axiosInstance;