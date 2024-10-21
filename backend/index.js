import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();
const app = express()
import router from "./routes.js"


app.use(cors())
app.use(express.json())
app.use("/api",router)

app.listen(process.env.PORT,()=>{
    console.log("Listening in port",process.env.PORT);
    
})