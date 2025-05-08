import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import DatabaseConnection from "./config/db.js"; 
import lessonRoutes from "./routes/lessonRoutes.js";
import userProfileRoute from "./routes/userProfileRoute.js";
import AuthRoute from "./routes/authRoute.js";
// import audioUploadRoutes from './routes/audioUploadRoutes.js'; 


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

DatabaseConnection(); 
const PORT = process.env.PORT || 4000;

app.use("/api/lessons", lessonRoutes);
app.use("/api/auth", AuthRoute);
app.use("/api/profile", userProfileRoute);
app.use('/api/users', AuthRoute); 
// app.use('/api/audio', audioUploadRoutes); 

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});