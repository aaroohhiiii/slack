import {createContext, useContext} from "react"
import {useAuth} from "@clerk/clerk-react"
import AxiosInstance from "../lib/axios";

import toast from "react-hot-toast";


// in every single rewuest  a tkken is going to sent to the backend 
const AuthContext =CreateContext();

export default function AuthProvider ([children]){
    const getToken = useAuth() ;



    useEffect (()=> {
  //setup axios interceptor 
  const interceptor = AxiosInstance.interceptors.request.use(
    async(config) =>{
        try{
            const token = await getToken();
            if(token){;
                config.headers.Authorization = `Bearer ${token}`;
            }
        }catch(error){
                if(error.message?.includes("auth")|| error.message?.includes("token")){
                    toast.error("Authentication error. Please log in again.");
                }
                console.error("Error fetching auth token:", error);
            }
            return config;
        }
    ,(error)=>{
        console.error("axios request failed" , error);
            return Promise.reject(error);

        
    }
    
  )
  // cleaup function to remoce the nerceptor this is w=done to avoid memeory leaka 
return ()=>{
    AxiosInstance.interceptors.request.eject(interceptor) ;


}
},[getToken])
return <AuthContext.Provider value = {{}}> {children}</AuthContext.Provider>
}



