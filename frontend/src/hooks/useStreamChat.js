import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import getStreamtoken from "../lib/api";
import * as Sentry from "@sentry/react";
//WHY ARE W E USING THIS USER IN THR FIRST PLACE . SO USER Cm se each othersgs o chat inr raltime . 

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


export const useStreamChat = () =>{


    const {user} = useUser() ;
    const [chatClient , setChatClient] = useState(null) ;

    //fetch stream token using react query 

    const {data :tokenData , isLoading ,error} = useQuery({
        queryKey :["streamToken"] ,
        queryFn : getStreamtoken ,
        enabled: !!user?.id //take a user obje and conve it to boolen
    }) ;

  useEffect(()=>{
    if(!tokenData?.token || !user) return ;
    
    let client;
    
const initChat = async ()=>{
    try {
        client = StreamChat.getInstance(STREAM_API_KEY) ;
        await client.connectUser({
            id : user.id,
            name :user.fullName ,
            image : user.imageUrl
        },
        tokenData.token
        )
        setChatClient(client);
    }catch(error){
        console.log("Error initializing Stream Chat:", error);
        Sentry.captureException(error);
    }
}

initChat();

//cleanup function to disconnect the chat client when the component unmounts or when the user changes
return ()=>{
    if(client) {
        client.disconnectUser().catch(console.error);
        setChatClient(null);
    }
}
  },[tokenData?.token, user?.id]) ;

  return {chatClient , isLoading :isLoading , error : error}
}