interview(function (result) {
    if (result) {
        console.log("smile");
    }
})

function interview(callback) {
    const probability = Math.random();
    if (probability < 0.8) {
        callback("success");
    }
}
