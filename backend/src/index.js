import express from "express";
import dotenv from "dotenv";
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());





// Routes
// app.use('/api/v1/auth', authRoutes)
// app.use('/api/v1/workouts', authMiddleware, verifyEmailMiddleware, workoutRoutes)
// app.use('/api/v1/pr', authMiddleware, verifyEmailMiddleware, prRoutes)


// Default route
app.get('/', async(req, res) => {
    res.send(`Welcome to uniLink API`)
})

// Error handling middleware
app.use(errorHandlerMiddleware)
app.use(notFound)





app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    
})
