import express from "express";
import dotenv from "dotenv";

// DB config
import connectDB from "./config/db.js";

// middlewares
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import {authMiddleware} from "./middlewares/authMiddleware.js"


// Routes Import
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"




dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());





// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/task', taskRoutes)




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