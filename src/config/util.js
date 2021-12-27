const Process = require("../model/process");

Array.prototype.priorityInsert = function(val) {
    if(!val instanceof Process) return;
    
    let contain = false;

    for(let i= 0; i<this.length; i++) {
        if(val.priority < this[i].priority) {
            this.splice(i, 0, val);
            contain = true;
            break;
        }
    }

    if(!contain) {
        this.push(val);
        val.startProcess();
    }
}


Array.prototype.fifoRemove = function() {
    //copying object
    let list = this.slice();

    list.sort((a, b) => {
        if(a.createdAt > b.createdAt) return 1;
        if(a.createdAt < b.createdAt) return -1;
        else return 0;
    });

    let index = this.findIndex((element)=> element.pid === list[0].pid );

    this.splice(index, 1);

}
