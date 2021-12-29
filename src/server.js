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

taskManager.addProcess( new Process(count++, CONSTANTS.LOW, CONSTANTS.TYPES[2]));
taskManager.addProcess( new Process(count++, CONSTANTS.MEDIUM, CONSTANTS.TYPES[1]));
taskManager.addProcess( new Process(count++, CONSTANTS.LOW, CONSTANTS.TYPES[0]));
taskManager.addProcess( new Process(count++, CONSTANTS.MEDIUM, CONSTANTS.TYPES[0]));
taskManager.addProcess( new Process(count++, CONSTANTS.HIGH, CONSTANTS.TYPES[1]));
taskManager.addProcess( new Process(count++, CONSTANTS.HIGH, CONSTANTS.TYPES[2]));





app.get("/", (req, res)=>{
    res.send("server responding");
});

app.get("/addprocess", (req, res)=> {
    const taskType = req.query.type;
    const priority = req.query.priority.toUpperCase();

    console.log("Adding process with the type:: ", taskType);
    console.log("Adding process with the priority:: ", CONSTANTS[priority]);
    
    const process = new Process(count++, CONSTANTS[priority], taskType);

    taskManager.addProcess(process);
    res.send("task Added");
});

app.get("/listprocess", (req, res)=>{
    console.log("Running process list size:: " + taskManager.runningProcess.length);
    res.set('Content-Type', 'application/json');

    res.send(taskManager.runningProcess);
});

app.get("/killprocess", (req, res)=>{
    console.log("Killing Process:: " + req.query.pid);
    taskManager.kill(req.query.pid);
    res.set('Content-Type', 'application/json');
    res.send(taskManager.runningProcess);
});

app.get("/killall", (req, res)=>{
    console.log("Running process list size:: " + taskManager.runningProcess.length);
    res.set('Content-Type', 'application/json');
    taskManager.runningProcess.forEach(p => p.killProcess());
    res.send(taskManager.runningProcess);
});

app.delete("/killgroup", (req, res)=>{
    console.log("Running process list size:: " + taskManager.runningProcess.length);
    res.set('Content-Type', 'application/json');
    res.send(taskManager.runningProcess);
});

app.listen(8080, ()=>{
    console.log("Server started.");
})

