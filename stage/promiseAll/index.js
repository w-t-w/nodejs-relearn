Promise.all([interview("alipay"), interview("tencent")])
    .then(() => {
        console.log("smile!");
    })
    .catch(error => {
        console.error(`cry at ${error.name} company!`);
    });

function interview(name) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const accept = Math.random();
            if (accept < 0.8) {
                resolve("success!");
                clearTimeout(timer);
            } else {
                const error = new Error("failed!");
                error.name = name;
                reject(error);
                clearTimeout(timer);
            }
        }, 500);
    });
}
