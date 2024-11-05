// interview(function (result) {
//     if (result) {
//         console.log("smile");
//     }
// })
//
// function interview(callback) {
//     const probability = Math.random();
//     const timer = setTimeout(function () {
//         if (probability < 0.8) {
//             callback("success");
//             clearTimeout(timer);
//         }
//     }, 500);
// }
// try {
// interview(function (err, result) {
//     if (err) {
//         return console.error('cry!', err);
//     }
//     console.log('smile!', result);
// });
// } catch (err) {
//     console.error('cry!', err);
// }
interview(function (err, result) {
    if (err) {
        return console.error('cry!', err);
    }
    console.log('smile!', result);
});
function interview(callback) {
    const probability = Math.random();
    const timer = setTimeout(function () {
        if (probability < 0.6) {
            callback(null, "success!")
        } else {
            callback(new Error("failed!"));
        }
        clearTimeout(timer);
    }, 500);
}
