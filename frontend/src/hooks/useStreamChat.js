import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@sentry/react";
//WHY ARE W E USING THIS USER IN THR FIRST PLACE . SO USER Cm se each othersgs o chat inr raltime . 

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


export const useStreamChat = () =>{


    const {user} = useUser() ;
    const {chatClient , setChatClient} = useState(null) ;


    //fetch stream token using react query 

``
    const {data :tokenData , isLoading:TokenLoading ,error:tokenError} = useQuery({
        queryKey :["streamToken"] ,
        queryFn : getStreamToken ,
        enabled: !!user?.id //take a user obje and conve it to boolen
    }) ;
  useEffect(()=>{
const initChat = async ()=>{
    if(!tokenData?.token || !user)return ;
    try {
        const client = StreamChat.getInstance(STREAM_API_KEY) ;
        await client.connectUser({
id : user.id,
name :user.fullName ,
image : user.imageUrl
        }
        )
        setChatClient(client);
    }catch(error){
 console.log("Error initializing Stream Chat:", error);
 Sentry.captureException(error);
    }
}
//cleanup function to disconnect the chat client when the component unmounts or when the user changes
return ()=>{
    if(chatClient) chatClient.disconnectUser() ;

}
  },[tokenData , user,chatClient]) ;

  return {chatzClient , isLoading :tokenLoading , error : tokenError}
}