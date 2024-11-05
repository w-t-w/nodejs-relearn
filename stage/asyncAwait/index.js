(async function () {
    try {
        await interview(1);
        await interview(2);
        await interview(3);
        console.log("smile!");
    } catch (error) {
        console.error(`cry at ${error.round} round!`);
    }
})();

async function interview(round) {
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
