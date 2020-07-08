const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition & game
recognition.start();

// Capture user speech
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
}

// check message against number
function checkNumber(msg) {
    const num = +msg;

    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is a valid number</div>';
        return;
    }

    // check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 to 100 </div>';
        return;
    }

    if (num === randomNum) {
        document.body.innerHTML = `<h2>Congrats! YOu guessed the number! <br><br><br> It was ${num}<h2>
        <button class="play-again" id="play-again">Play again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += '<div>Go Lower </div>';
    } else {
        msgEl.innerHTML += '<div>Go Higher </div>';
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// speak result
recognition.addEventListener('result', onSpeak);

// End speech reg service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
})