
const fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;
var mean = 0;

window.onload = function() {

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            if(data) {
                // console.log("Current: " + data.x +', '+ data.y);
                var x = localStorage.getItem('x');
                var y = localStorage.getItem('y');
                var count = localStorage.getItem('count')+1;
                if(x && y) {
                    x = parseInt(x);
                    y = parseInt(y);
                    count = parseInt(count);
                    var distance = Math.round(Math.sqrt((data.x-x)*(data.x-x) + (data.y-y)*(data.y-y)));
                    console.log(distance);

                    var saccadicV = document.getElementById("saccadicVelocity");
                    if(saccadicV) {
                        saccadicV.innerText = Math.max(parseInt(saccadicV.innerText), distance);
                        fs.appendFileSync(`${desktopDir}/peaksv.txt`, saccadicV.innerText+"\n");
                    }
                    var meanSaccadicV = document.getElementById("meanSaccadicVelocity");
                    if(meanSaccadicV) {
                         mean = Math.round((mean * (count-1) + distance)/ count);
                         meanSaccadicV.innerText = mean;
                        fs.appendFileSync(`${desktopDir}/meansv.txt`, meanSaccadicV.innerText+"\n");
                    }
                    localStorage.setItem('count', count);
                } else {
                    localStorage.setItem('count', 0);
                }
                localStorage.setItem('x', data.x);
                localStorage.setItem('y', data.y);
            }
            //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}
