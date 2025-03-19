import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_DB=process.env.MONGO_URL ;

const connectMongo= async ()=>{
  if (!MONGO_DB) {
    throw new Error('MONGO_URL is not defined in environment variables');
  }
    try{
    await mongoose.connect(MONGO_DB)
        console.log("database connected successfully")
}
    catch(err){
      console.log(`database connection failed `,err)  
    }    
}
export default connectMongo;

