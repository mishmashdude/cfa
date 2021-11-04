const fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;

// State can be 0 if game is not started, 1 if game is in progress
let started = false;
let ready = false;
let gameText = document.getElementById("game-text");
let currTime;
let random;
let timeout;
let count = 0;
let finalScore = 0;
let finished = false;

setTimeout(()=> {
    console.log('this happened');
    finished = true;
}, 60*1000*5);

let game = document.getElementsByClassName("game")[0];
game.onclick = function () {
    if(started && ready) {
        let newTime = new Date().getTime();
        let result = newTime - (currTime + random);
        if(finished) {
            gameText.innerText = "Your speed is " + Math.round(finalScore/count)  + "ms \n" + "Click to play again.";
            fs.appendFile(desktopDir+'/pvt.txt', `${Math.round(finalScore/count)}`, (err) => {
                if (err) throw err;
                console.log('Results saved!');
                window.location.reload();
                window.alert('Results saved');
            });

            started = false;
            count = 0;
            finished = false;
        } else {
            gameText.innerText = result + "ms\n" + "Click to keep going";
            finalScore += result;
            count ++;
        }        
        game.style.backgroundColor = "rgb(43, 135, 209)";
        started = false;
        ready = false;
        clearTimeout(timeout);
    } else if(!started) {
        gameText.innerText = "Waiting for green...";
        game.style.backgroundColor = "red";
        started = true;

        currTime = new Date().getTime();
        random = Math.floor(Math.random() * 5000) + 1000;
        
        timeout = setTimeout(() => {
            ready = true;
            gameText.innerText = "Click Now";
            game.style.backgroundColor = "green";
        }, random);


    } else if(started && !ready) {
        gameText.innerText = "Clicked too soon.\n" + "Click to play again."
        game.style.backgroundColor = "rgb(43, 135, 209)";
        started = false;
        clearTimeout(timeout);
    }
}


