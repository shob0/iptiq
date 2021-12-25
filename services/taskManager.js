const { CONSTANTS } = require("../constants/constants");
const Process = require("../model/process");

function TaskManager(maxCapacity) {
    let count = 1000;
    this.maxCapacity = maxCapacity;
    this.runningProcess = [];

    this.addProcess = function addProcess(mode) {
        console.log("Creating process to be added to the task manager.");
        const process = new Process(count++, CONSTANTS.LOW);
        console.log("Running process list size:: " + this.runningProcess.length);
        if(this.runningProcess.length > maxCapacity) {
            if(mode) { // check if mode is from defined mdoes only
                handleRunningProcessBasedOnType(mode);
                this.runningProcess.push(process);
            } else {
                console.log("Process will not be added to the Task Manager.");
                return;
            }
        } else {
            console.log("Adding process to the running process list");
            //set a timeout based on priortiy type
            this.runningProcess.push(process);
        }
    }

    function handleRunningProcessBasedOnType(mode) {
        switch(mode) {
            case CONSTANTS.FIFO:
                this.runningProcess.pop();
                return;
            case CONSTANTS.PRIORITY:
                //remove process based on priority
                return;
            default:
                return;
            
        }
    }
    
    this.kill = function kill(pid) {
        
    }
    
    this.killAll = function killAll() {
        this.runningProcess.forEach(process=>process.kill());
    }
    
    this.killGroup = function killGroup(group) {
        
    }
    
}



module.exports = TaskManager;