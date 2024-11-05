interview(1, function (error_first, result_first) {
    if (error_first) {
        return console.error(`cry at ${error_first.round} round!`);
    }
    interview(2, function (error_second, result_second) {
        if (error_second) {
            return console.error(`cry at ${error_second.round} round!`);
        }
        interview(3, function (error_third, result_third) {
            if (error_third) {
                return console.error(`cry at ${error_third.round} round!`);
            }
            console.log('smile!');
        });
    });
});

function interview(round, callback) {
    const timer = setTimeout(() => {
        const accept = Math.random();
        if (accept < 0.8) {
            callback(null, "success!");
            clearTimeout(timer);
        } else {
            const error = new Error("failed!");
            error.round = round;
            callback(error);
            clearTimeout(timer);
        }
    }, 500);
}
