const EventEmitter = require("events").EventEmitter;

class GeekBang extends EventEmitter {
    constructor() {
        super();
        const timerInterval = setInterval(() => {
            this.emit("onSale", {price: Math.floor(Math.random() * 100)});
        }, 600);
    }
}

const geekBang = new GeekBang();

module.exports = geekBang;
