const eventLoop = {
    queue: [],
    fsWriteQueue: [],
    timeoutQueue: [],
    loop() {
        while (this.queue.length) {
            const callback = this.queue.shift();
            callback();
        }
        setInterval(() => {
            this.loop();
        }, 100);
    },
    add(listener) {
        this.queue.push(listener);
    }
};

eventLoop.loop();

const timer = setTimeout(() => {
    eventLoop.add(() => {
        console.log("first", timer);
    });
    clearTimeout(timer);
}, 500);

const timer_ano = setTimeout(() => {
    eventLoop.add(() => {
        console.log("second", timer_ano);
    });
    clearTimeout(timer_ano);
}, 900)
