import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import connectDB from "./config/db.js";

// Routes Import
import authRoutes from "./routes/authRoutes.js"




dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());





// Routes
app.use('/api/v1/auth', authRoutes)

// app.use('/api/v1/', authMiddleware, verifyEmailMiddleware, workoutRoutes)
// app.use('/api/v1/', authMiddleware, verifyEmailMiddleware, prRoutes)


// Default route
app.get('/', async(req, res) => {
    res.send(`Welcome to FocusFlow API`)
})

// Error handling middleware
app.use(errorHandlerMiddleware)
app.use(notFound)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
         app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()