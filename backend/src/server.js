import express from "express";
import {clerkMiddleware} from "@clerk/express";
import {ENV} from "./config/env.js";
import { connectDB } from "./config/db.js";
import {functions , inngest} from "./config/inngest.js";
import { serve } from "inngest/express";
const app = express();
const PORT = process.env.PORT || 5001;

//req ath will be availavle in request object 
app.use(express.json());
app.use(clerkMiddleware())
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/" ,(req,res)=>{
    res.send("Hello World");
    
} )



const startServer = async()=>{
    try{
await connectDB();
      if(ENV.NODE_ENV !== "PRODUCTION"){
        app.listen(ENV.PORT , ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
      }
    }catch(error){
   console.error("error startung server" , error);
   process.exit(1);
    }
}