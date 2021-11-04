// @
// Tracks and enters mouse position
// document.body.addEventListener('mousemove', function(e) {
//   function getMousePos(e) {
//     return {x:e.clientX,y:e.clientY};
//   }
//   var mousecoords = getMousePos(e);
//   console.log(`Mouse position X: ${mousecoords.x}, Y: ${mousecoords.y}`)
// })

// Use to test if webcam works
// const initCamera = async (width, height) => {

//     const video = document.getElementById('camera');
//     video.width = width;
//     video.height = height;
  
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: false,
//       video: {
//         facingMode: "user",
//         width: width,
//         height: height
//       }
//     });
//     video.srcObject = stream;
  
//     return new Promise((resolve) => {
//       video.onloadedmetadata = () => {
//         resolve(video);
//       };
//     });
//   };
  
// initCamera(500, 500);

// Notification launch tester
const session = document.getElementById("session");
const timer = document.getElementById("timer");
timer.innerText = "00:00";
const startSession = function () {
  // Collect the result from the input field
  const sessionLength = document.getElementById("session-length").value;

  const intervalLength = document.getElementById("interval-length").value;

  // Setup a timer for the entire session duration
  let min = sessionLength;
  let sec = 0;
  timer.innerText = sessionLength + ":" + "00";

  const timerSetter = setInterval(function() {

    if(sec == 0) {
      min = min - 1;
      sec = 59;
    } else {
      sec = sec - 1;
    }
    if(sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    timer.innerText =  min + ":" + sec; 
  }, 1000);


  // Setup a timer for that interval
  // Setup the reminders to come through
  const intervalSetter = setInterval(function() {
    new window.Notification(fatigueNotification.title, fatigueNotification);
  }, intervalLength*1000*60);

  const timeout = setTimeout(function() { clearInterval(timerSetter); clearInterval(intervalSetter); window.alert('we did it');}, sessionLength*1000*60);


  // See if the reminders when clicked take you to a specific quiz page. If not, install a button below to take a quiz on a new page

  //Need a stop session button as well
  session.innerText = "Stop Session";
  session.removeEventListener('click', startSession);
  session.addEventListener('click', 
    function stopSession() {
      clearInterval(timerSetter);
      clearInterval(intervalSetter);
      clearTimeout(timeout);
      timer.innerText = "00:00";
      session.innerText = "Stop Session";
      session.addEventListener('click', startSession);
      session.removeEventListener('click', stopSession);
    }
  );
}

session.addEventListener('click', startSession);

const fatigueNotification = {
    title: 'You are Mentally Fatigued',
    body: 'It seems like you are a little mentally fatigued. Take a quick test to find out.'
}

const notificationButton = document.getElementById('fatigued-notif');

notificationButton.addEventListener('click', () => {
    const myNotification = new window.Notification(fatigueNotification.title, fatigueNotification);

    myNotification.onclick = () => {
        console.log('Notif clicked');
    }
})

const questionnaire = document.getElementById('questionnaire');
questionnaire.onclick = () => {
  window.open('./questionnaire.html');
}

const pvt = document.getElementById('pvt');
pvt.onclick = () => {
  window.open('./pvt.html');
}


// Eye tracking contents below

// const prediction = webgazer.getCurrentPrediction();
// if (prediction) {
//     var x = prediction.x;
//     var y = prediction.y;
// }
