const Process = require("../model/process");
const { CONSTANTS } = require("./constants");

function sortByDate(a, b) {
    if (a.createdAt > b.createdAt) return 1;
    if (a.createdAt < b.createdAt) return -1;
    else return 0;
};

Array.prototype.priorityInsert = function (val) {
    if (!val instanceof Process) return;

    let contain = false;

    for (let i = 0; i < this.length; i++) {
        if (val.priority < this[i].priority) {
            this.splice(i, 0, val);
            contain = true;
            break;
        }
    }

    if (!contain) {
        this.push(val);
        val.startProcess();
    }
}


Array.prototype.fifoRemove = function () {
    //copying object
    let list = this.slice();

    list.sort(sortByDate);

    let index = this.findIndex((element) => element.pid === list[0].pid);

    this.splice(index, 1);
    console.log(this);
}

Array.prototype.priorityRemove = function (priority) {
    //copying object
    
    for (let i = 0; i < this.length; i++) {
        if (this[i].priority >= priority) {
            list = this.slice(0, i);
            break;
        }
    }


    //handle when list is empty

    list.sort(sortByDate);
    
    let index = this.findIndex((element) => element.pid === list[0].pid);

    this.splice(index, 1);
    console.log(this);

}





