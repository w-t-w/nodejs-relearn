const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // for (let i = 0; i < os.cpus().length / 2; i++) {
    for (let i = 0; i < 1; i++) {
        // 父进程"僵尸"假死监控
        const worker = cluster.fork();
        let heartbeat_count = 0;
        const heartbeat_monitor = setInterval(function () {
            console.log("ping!");
            worker.send("ping!");
            heartbeat_count++;

            if (heartbeat_count >= 3) {
                process.kill(worker.process.pid);
                clearInterval(heartbeat_monitor);
            }
        }, 200);
        worker.on('message', function (msg) {
            if (msg === 'pong!') {
                console.log("pong!");
                heartbeat_count--;
            }
        });
    }
    cluster.on("exit", function () {
        setTimeout(function () {
            cluster.fork();
        }, 5000);
    });
} else {
    require('../downloadSimple');
    // 异常监控
    process.on('uncaughtException', (err) => {
        console.error(err);
        process.exit(1);
    });
    // 内存监控
    const memory_monitor = setInterval(function () {
        const memoryUsage = process.memoryUsage().rss;
        console.log(memoryUsage);
        if (memoryUsage > 734003200) {
            console.log('oom!');
            process.exit(1);
            clearInterval(memory_monitor);
        }
    }, 500);
    // 子进程"僵尸"假死监控
    process.on("message", function (msg) {
        if (msg === 'ping!') process.send("pong!");
    });
}
