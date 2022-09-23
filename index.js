import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"

const app = express();
app.use(express.json()); 
dotenv.config();

app.listen(5000, () => {
    console.log("Server is running on port: 5000")

    mongoose.connect(process.env.MONGO_DB_CONNECION_STRING)
        .then(() => { console.log("Database Connection is Succesfull") })
        .catch((err) => { console.log("ERROR DB CONNECTION") })
})


app.use("/api/auth", authRoute);