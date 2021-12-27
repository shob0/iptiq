const { CONSTANTS } = require("../config/constants");
const Process = require("../model/process");
const emitter = require("../config/event");
require("../config/util.js");

function TaskManager(maxCapacity) {
    this.maxCapacity = maxCapacity;
    this.runningProcess = [];

    emitter.on('KILPROCESS', (process)=>{
        console.log('event handelr process')
        this.runningProcess =  removeItemFromList(this.runningProcess, process);
        console.log(this.runningProcess)
    });

    /**
     * 
     * @param {Process type} mode 
     * @param {Actual Process Object} process 
     * Adds process object to the running process list
     * @returns 
     */
    this.addProcess = function addProcess(mode, process) {

        console.log(`Process no: ${process.pid}  to be added to the task manager with mode ${mode}`);
        console.log("Current running process list size:: " + this.runningProcess.length);
        
        if(this.runningProcess.length > maxCapacity) {
            switch(mode) {
                case CONSTANTS.FIFO:
                    this.runningProcess.fifoRemove();
                    break;
                case CONSTANTS.PRIORITY:
                    this.runningProcess.shift();
                    break;
                default:
                    console.log("Not adding process as capacity overflown.")
                    return;
            }
        } 
        console.log("Adding process to the running process list");
        //set a timeout based on priortiy type
        this.runningProcess.priorityInsert(process);
    }

    
    this.kill = function kill(pid) {
        this.runningProcess.filter(p=>{
            if(p.pid === pid){
                p.killProcess();
            }
        });
    }
    
    this.killAll = function killAll() {
        this.runningProcess.forEach(process=>process.kill());
    }
    
    this.killGroup = function killGroup(group) {
        
    }

    
    
}



module.exports = TaskManager;