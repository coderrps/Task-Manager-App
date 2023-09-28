const Task = require("../models/Task");
const asyncWrapper = require('../middlewares/async')
const {createCustomError} = require('../errors/custom-error')
// Getting all the tasks
const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks})
});

// Creating a new task
const createTask = asyncWrapper (async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

// Getting a task
const getTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});

// Deleting a task
const deleteTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});

// Updating a task
const updateTask = asyncWrapper (async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators :true,
    });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404))
    } 
    res.status(200).json({task})
    res.status(500).json({ msg: error });
});

// Edit task
// const editTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
    
//         const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators :true,
//             overwrite: true,
//         });
//         if (!task) {
//           return res.status(404).json({ msg: `No task with the id: ${taskID}` });
//         }
    
//         res.status(200).json({task})
//       } catch (error) {
//         res.status(500).json({ msg: error });
//       }
// }

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
//   editTask
};