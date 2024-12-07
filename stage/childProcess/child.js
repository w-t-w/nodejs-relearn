process.on("message", (msg) => {
    console.log(`child receive ${msg}!`);
    console.log('child send hehe!');
    process.send('hehe');
});
