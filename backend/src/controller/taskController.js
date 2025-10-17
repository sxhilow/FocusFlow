// Tyreek will handle the logic within these controllers


// fetch all the tasks
export const getAllTask = async (req, res) => {
    res.send('get all task')
}

// fetch a single task (to edit)
export const getTask = async (req, res) => {
    res.send('get a task')
}

// create a task
export const createTask = async (req, res) => {
    res.send('create a task')
}

// update a task
export const updateTask = async (req, res) => {
    res.send('update a task')
}

// delete a task
export const deleteTask = async (req, res) => {
    res.send('delete a task')
}