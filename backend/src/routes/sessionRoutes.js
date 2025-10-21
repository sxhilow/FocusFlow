import express from "express"
import { getSession, stopSession, startSession } from "../controller/sessionController.js"


const router = express.Router()

router.get('/', getSession)
router.post('/start', startSession)
router.post('/stop', stopSession)

export default router