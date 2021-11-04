const fs = require('fs');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;

const quiz = document.getElementById("quiz");

const submit = document.getElementById("submit");

submit.onclick = (event) => {

    let q1 = [...quiz.elements['q1']].findIndex(x => x.checked)+1;
    
    let q2 = [...quiz.elements['q2']].findIndex(x => x.checked)+1;

    let q3 = [...quiz.elements['q3']].findIndex(x => x.checked)+1;

    let q4 = [...quiz.elements['q4']].findIndex(x => x.checked)+1;

    let q5 = [...quiz.elements['q5']].findIndex(x => x.checked)+1;

    let newDate = new Date().toLocaleDateString();
    let newTime = new Date().toLocaleTimeString();

    let scores = `${newTime} ${newDate}\n${q1}\n${q2}\n${q3}\n${q4}\n${q5}\n`;
    console.log(scores);

    //add timestamp and add the ability to write on top

    fs.appendFile(desktopDir+'/questionnaire.txt', scores, (err) => {

        if (err) throw err;

        console.log('Results saved!');
        window.location.reload();
        window.alert('Results saved');
    });
    
}


