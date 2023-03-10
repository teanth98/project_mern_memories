import express from 'express';
import bodyParser from 'body-parser';
import nodemon from 'nodemon';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(cors());
app.use('/posts',postRoutes);

const CONNECTION_URL = "";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).
then(()=>app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`))).
    catch((error)=>console.log(error.message));

// mongoose.set('useFindAndModify',false);