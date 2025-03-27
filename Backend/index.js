import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectmongo from './config/db.js'
import userProfileRoute from './routes/userProfileRoute.js'
import AuthRoute from './routes/authRoute.js'
import userprefrencesRoute from './routes/userPreferencesRoute.js'

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

connectmongo();
const PORT = process.env.PORT

app.use('/api/auth',AuthRoute)
app.use('/api/languages',userprefrencesRoute)
app.use("/api/userProfile",userProfileRoute)
app.use('/auth',AuthRoute);

app.listen(PORT,() =>{
    console.log(`server is running in the port ${PORT}`)
});


