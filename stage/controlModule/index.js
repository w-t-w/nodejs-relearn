const geekBang = require('./emitter');

geekBang.on("onSale", ({price}) => {
    if (price <= 80) {
        console.log(`buy!The price is ${price}!`);
    } else {
        console.log(`That's too expensive!The price is ${price}!`);
    }
});
