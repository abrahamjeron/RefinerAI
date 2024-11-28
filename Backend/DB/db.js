const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

 const connectDb = async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("mongoose connected")
    }catch(err){
        console.error(err)
    }
 }
 const disconnetDb=()=>{
    mongoose.disconnect();
    console.log("mongoose disconnected");
 }
 const checkConnected=()=>{
    const dbStatus = mongoose.connection.readyState;
    return dbStatus===1;
 }
 module.exports={
    connectDb,
    disconnetDb,
    checkConnected
 }