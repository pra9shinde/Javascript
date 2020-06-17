const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;//ms
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
    // console.log('breathe in');
    text.innerText = 'Breathe In!!';

    container.className = 'container grow';

    setTimeout(() => {
        // console.log('hold');

        text.innerText = 'Hold!!';

        setTimeout(() => {
            // console.log('Breathe Out!');
            text.innerText = 'Breathe Out!!';
            container.className = 'container shrink';

        }, holdTime);

    }, breathTime);
}

setInterval(() => {
    breathAnimation();
}, 7500);