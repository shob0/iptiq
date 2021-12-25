function  Process(pid, priority) {
    this.pid= pid;
    this.priority = priority;
    this.createdAt = new Date();

    this.killProcess = function kill () {
        console.log("killing Process with pid:: " + this.pid);
    }
}

module.exports = Process;