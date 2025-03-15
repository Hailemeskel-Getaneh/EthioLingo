import express from 'express'
import cors from 'cors'
import dotevn from 'dotenv'
import bodyParser  from 'body-parser'

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotevn.config();
const PORT = process.env.PORT || 5000;


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})