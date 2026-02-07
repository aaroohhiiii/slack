
import "../instrument.mjs";
import express from "express";
import {clerkMiddleware} from "@clerk/express";
import {ENV} from "./config/env.js";
import * as Sentry from "@sentry/node";
import { connectDB } from "./config/db.js";
import {functions , inngest} from "./config/inngest.js";
import chatRoutes from "./routes/chat.route.js";
import { serve } from "inngest/express";
const app = express();
const PORT = process.env.PORT || 5001;

//req ath will be availavle in request object 
app.use(express.json());
app.use(clerkMiddleware())


app.get("/debug-sentry" , (req,res)=>{
    throw new Error("This is a test error for Sentry debugging")
})

app.get("/" ,(req,res)=>{
    res.send("Hello World");
    
} )
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat" , chatRoutes)
Sentry.setupExpressErrorHandler(app);



const startServer = async()=>{
    try{
await connectDB();
      if(ENV.NODE_ENV !== "production"){
        app.listen(ENV.PORT , ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
      }
    }catch(error){
   console.error("error starting server" , error);
   process.exit(1);
    }
}

startServer();

export default app;