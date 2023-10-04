import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/user.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
env.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());



app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);


//Error Handling middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    app.listen(5000, () => {
        console.log("The server and database are successfully running");
    });
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
