import axiosInstance from "./axios"

export default async function getStreamtoken (){
    const response = await axiosInstance.get("/chat/token") ;
    return response.data ;
}