
const express = require("express");
const app = express();
const tasks = require('./routes/tasks')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const connect = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000


// app.get('/api/v1/tasks')      -get all tasks
// app.post('/api/v1/task')      -create a task (C)
// app.get('api/v1/task/:id')    -get single task (R)
// app.patch('api/v1/task/:id')  -update task (U)
// app.delete('api/v1/task/:id') -delete task (D)


const start = async () => {
    try {
        await connect.connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start()

