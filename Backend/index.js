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
const PORT = process.env.PORT || 5000;

DatabaseConnection();

app.use('/api/lessons', lessonRoutes);
// app.use('/api/audio', audioUploadRoutes);  uncomment this if you want to upload files to cloudinary and also store data to the database

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});