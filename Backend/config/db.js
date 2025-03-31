import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL=process.env.MONGO_URL ;

const connectMongo= async ()=>{
  console.log('MONGO_URL:', MONGO_URL); // Add this line
  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in environment variables');
  }
    try{
    await mongoose.connect(MONGO_URL)
        console.log("database connected successfully")
}
    catch(err){
      console.log(`database connection failed `,err)  
    }    
}
export default connectMongo;

