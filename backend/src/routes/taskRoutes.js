import express from "express"
import { createTask, deleteTask, getAllTask, getTask, updateTask } from "../controller/taskController.js"

const router = express.Router()


router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

export default router