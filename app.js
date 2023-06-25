import express from 'express';
import mongoose from "mongoose";
import router from './routes/user_routes';
import groupRouter from './routes/group_routes';

const app = express();

app.use(express.json());
app.use("/api/user",router);
app.use("/api/groups",groupRouter);

mongoose.connect('mongodb+srv://garvitasingh:shareHere@cluster0.g9rbxvr.mongodb.net/ShareHere?retryWrites=true&w=majority')
    .then(() => app.listen(6000))
    .then(() =>
     console.log("conected to database and listening to post 6000"))
     .catch((err) => console.log(err));
