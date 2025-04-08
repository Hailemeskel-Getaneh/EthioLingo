import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import DatabaseConnection from './config/db.js';
import lessonRoutes from './routes/lessonRoutes.js';
// import audioUploadRoutes from './routes/audioUploadRoutes.js'; 


const app = express();
app.use(cors());
app.use(bodyParser.json());


dotenv.config();
const PORT = process.env.PORT || 4000;

DatabaseConnection();

app.use('/api/lessons', lessonRoutes);
// app.use('/api/audio', audioUploadRoutes);  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectmongo from './config/db.js'
import userProfileRoute from './routes/userProfileRoute.js'
import AuthRoute from './routes/authRoute.js'


dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

connectmongo();
const PORT = process.env.PORT

app.use('/api/auth',AuthRoute,)
app.use('/api/profile',userProfileRoute)


app.listen(PORT,'0.0.0.0',() =>{
    console.log(`server is running in the port ${PORT}`)
});


