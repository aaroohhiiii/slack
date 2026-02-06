import mongoose from "mongoose" ;


const userschema = new mongooose.Schema({
 email :{
    type : String ,
    required : true ,
    unique : true
 },
 name :{
    type : String ,
    required : true ,
 },
 image:{
    type : String ,

 },
 clerkId :{
    type : String ,
    required : true ,
    unique : true
 }

},{
    timestamps:true
})

export const user = mongoose.model("User" ,userSchema)