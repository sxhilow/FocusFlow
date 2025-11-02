import { NotFoundError } from '../errors/index.js';
import Task from '../models/taskModel.js';
import { StatusCodes } from 'http-status-codes';

// Fetch all tasks for a user
export const getAllTask = async (req, res) => {
  const { userId } = req.user;
  const tasks = await Task.find({ userId }).sort({ start: 1 });
  res.status(StatusCodes.OK).json({
    results: tasks.length,
    tasks,
  });
};

// Fetch a single task
export const getTask = async (req, res) => {
  const { userId } = req.user;
  const { id : taskId } = req.params

  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) throw new NotFoundError('Task not found');

  res.status(StatusCodes.OK).json({task});
};

// Create a task
export const createTask = async (req, res) => {
  const { userId } = req.user;
  const { title, start, end, category } = req.body;
  
  const task = await Task.create({
    title,
    start,
    end,
    category,
    userId,
  });

  res.status(StatusCodes.CREATED).json({task});
};

// Update a task
export const updateTask = async (req, res) => {
  const { userId } = req.user;
  const { id : taskId } = req.params;
  const updatesData = req.body

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    {$set: updatesData},
    { new: true, runValidators: true }
  );

  if (!task) throw new NotFoundError('Task not found');

  res.status(StatusCodes.OK).json({task});
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { userId } = req.user;
  const { id : taskId } = req.params

  const task = await Task.findOneAndDelete({ 
    _id: taskId, 
    userId 
  });

  if (!task) throw new NotFoundError('Task not found');

  res.status(StatusCodes.OK).json({
    msg: "Deleted Successfully"
  });
};