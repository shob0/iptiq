const express = require("express");
const TaskManager = require("./services/taskManager");

const app = express();
app.use(express.json());

var taskManager = new TaskManager(10);

app.get("/", (req, res)=>{
    res.send("server responding");
});

app.get("/addprocess", (req, res)=>{
    const taskType = req.query.type;
    console.log("Adding process with the type:: ", taskType);
    taskManager.addProcess();
    res.send("task Added");
});

app.get("/listprocess", (req, res)=>{
    console.log("Running process list size:: " + taskManager.runningProcess.length);
    taskManager.runningProcess
        .forEach(process =>{
            console.log(process.pid);
        });
    res.send("task Added");
});

app.listen(8080, ()=>{
    console.log("Server started.");
})

