import {axiosInstance} from "./axoios"

export async function getStreamtoken (){
    const response = await axiosInstance.get("/chat/token") ;
    return response.data ;
}