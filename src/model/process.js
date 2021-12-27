const e = require("express");
const emitter = require("../config/event");

function  Process(pid, priority) {
    this.pid= pid;
    this.priority = priority;
    this.createdAt = new Date();

    this.killProcess = function kill () {
        console.log("killing Process with pid:: " + this.pid);
        emitter.emit('KILPROCESS', this);
    } 

    this.startProcess = function start() {
        console.log('Process started.')
        // setTimeout(() => {
        //     this.killProcess();
        // }, 2000);
    }
}

module.exports = Process;