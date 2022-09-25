import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"

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
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
