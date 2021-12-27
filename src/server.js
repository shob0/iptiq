const express = require("express");
const cors = require("cors");

const { CONSTANTS } = require("./config/constants");
const Process = require("./model/process");
const TaskManager = require("./services/taskManager");

const app = express();

app.use(cors());
app.use(express.json());


let count = 1000;

let taskManager = new TaskManager(10);

taskManager.addProcess(CONSTANTS.TYPES[0], new Process(count++, CONSTANTS.LOW));
taskManager.addProcess(CONSTANTS.TYPES[1], new Process(count++, CONSTANTS.MEDIUM));
taskManager.addProcess(null, new Process(count++, CONSTANTS.LOW));
taskManager.addProcess(CONSTANTS.TYPES[0], new Process(count++, CONSTANTS.HIGH));



app.get("/", (req, res)=>{
    res.send("server responding");
});

app.get("/addprocess", (req, res)=> {
    const taskType = req.query.type;
    const priority = req.query.priority;

    console.log("Adding process with the type:: ", taskType);
    console.log("Adding process with the priority:: ", priority);
    
    const process = new Process(count++, priority);

    taskManager.addProcess(taskType, process);
    res.send("task Added");
});

app.get("/listprocess", (req, res)=>{
    console.log("Running process list size:: " + taskManager.runningProcess.length);
    res.set('Content-Type', 'application/json');
    res.send(taskManager.runningProcess);
});

app.listen(8080, ()=>{
    console.log("Server started.");
})

