interview(1)
    .then(() => {
        return interview(2);
    })
    .then(() => {
        return interview(3);
    })
    .then(() => {
        console.log('smile!');
    })
    .catch((error) => {
        console.error(`cry at ${error.round} round!`);
    });

function interview(round) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            const accept = Math.random();
            if (accept < 0.8) {
                resolve("success!");
                clearTimeout(timer);
            } else {
                const error = new Error("failed!");
                error.round = round;
                reject(error);
                clearTimeout(timer);
            }
        }, 500);
    });
}
