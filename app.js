import express from "express";
import mongoose from "mongoose"
import 'dotenv/config'
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import postRouter from "./routes/post.js";
import category from "./routes/category.js";
import uploadRoute from "./routes/upload.js";
import cors from 'cors'


const app = express()
const port = process.env.PORT_NUMBER;
app.use(express.json())
app.use(cors(
    {
        origin: process.env.ALLOWED_ORIGIN,
        methods:['GET','POST','PUT','DELETE']
    }
))

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Successfull connection with the database")
    })
    .catch(err => console.log(err))

app.use('/api/uploads/',uploadRoute)    
app.use('/api/auth',auth);
app.use('/api/users',user);
app.use('/api/posts',postRouter);
app.use('/api/categories',category);
app.listen(port);