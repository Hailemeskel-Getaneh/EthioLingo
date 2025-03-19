import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectmongo from './config/db.js'
import UserProfileRoute from './routes/userProfileRoute.js'
import userprefrencesRoute from './routes/userPreferencesRoute.js'

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

connectmongo();
const PORT = process.env.PORT

app.use('/profile',UserProfileRoute)
app.use('/api/languages',userprefrencesRoute)

app.listen(PORT,() =>{
    console.log(`server is running in the port ${PORT}`)
});


