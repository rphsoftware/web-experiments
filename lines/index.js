var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var canv = document.createElement('canvas');
canv.id = "c";
canv.width = w;
canv.height = h;
document.getElementsByTagName('body')[0].appendChild(canv);
var ctx = document.getElementById('c').getContext('2d');

var config = {
    rate: 2000,
    updates: 10,
    colors: false
};
var drawnLines = 0;
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
}
function color() {
    var rval = "#";
    rval = rval + getRandomNumber(0, 255).toString(16);
    rval = rval + getRandomNumber(0, 255).toString(16);
    rval = rval + getRandomNumber(0, 255).toString(16);
    if (config.colors) return rval;
    else return "#000000";
}
var currentID = 0;
function run() {
    currentID = setInterval(function () {
        for (var i = 0; i < config.rate / config.updates; i++) {
            ctx.beginPath();
            ctx.strokeStyle = color();
            ctx.moveTo(getRandomNumber(1, w), getRandomNumber(1, h));
            ctx.lineTo(getRandomNumber(1, w), getRandomNumber(1, h));
            ctx.stroke();
            ctx.closePath();
            drawnLines++;
        }
    }, config.updates);
}
function toggle() {
    if (currentID != 0) {
        clearInterval(currentID);
        currentID = 0;
    } else {
        run();
    }
}
function clear() {
    ctx.clearRect(0, 0, w, h);
}
function toggleColor() {
    config.colors = !config.colors;
}
function configure(key, value) {
    if (!key) {
        console.log("Welcome to Config:tm:");
        console.log("Run toggle(); to toggle the animation");
        console.log("Run clear(); to clear the canvas");
        console.log("Run config(\"rate\", <amount>); to describe how many lines per second do you want");
        console.log("Run config(\"updates\", <amount>); to describe every how many milliseconds do you want a display update");
        console.log("Run toggleColor(); to toggle if I should use colors");
        console.log("Run drawnLines to see how many lines I have drawn yet");
    } else if (key == "rate") {
        config.rate = value;
    } else if (key == "updates") {
        config.updates = value;
    } else {
        console.log("Invalid key");
    }
}
run();