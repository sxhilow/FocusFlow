// Sahil is responsible for this logic
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Session from "../models/sessionsModel.js"
import { StatusCodes } from "http-status-codes";

export const getSession = async (req, res) => {
    const { userId } = req.user

    const {active} = req.query;

    const query = {userId};
    if(active === "true"){
        query.endTime = null;
    }

    const sessions = await Session.find(query).sort({startTime: -1}) // sorts session by start time in a descending order

    if(sessions.length === 0){
        throw new NotFoundError("No session found")
    }
    res.status(StatusCodes.OK).json({ sessions });
}

export const startSession = async (req, res) => {
    const { userId } = req.user
    const { taskId, commitmentText } = req.body

    if(!commitmentText || commitmentText.trim().length === 0){
        throw new BadRequestError("Commitment Text is required to start a session.")
    }

    const activeSession = await Session.findOne({userId, status: "active"});

    if(activeSession){
        throw new BadRequestError("You already have an active session")
    }

    const session = await Session.create({
        userId,
        taskId: taskId || null,
        commitmentText: commitmentText.trim(),
        status: "active",
        startTime: new Date()
    })

    res.status(StatusCodes.CREATED).json({session})

}

export const stopSession = async (req, res) => {
    const { userId } = req.user;
    const { reflectionText } = req.body

    if(!reflectionText || reflectionText.length === 0){
        throw new BadRequestError("Reflection is required to stop a session.")
    }


    const session = await Session.findOne({userId, status:"active"});

    if(!session){
        throw new NotFoundError("No active session found to stop")
    }

    session.endTime = new Date();
    session.status = "finalized";
    session.reflection.push(reflectionText.trim());


    // points reward
    session.duration = Math.round((session.endTime - session.startTime) / (1000 * 60));

    const basePointsPerBlock =10;
    let points = Math.floor(session.duration / 15) * basePointsPerBlock;

    session.points = points;
    session.validate = true;

    await session.save();

    res.status(StatusCodes.OK).json({session})

}



