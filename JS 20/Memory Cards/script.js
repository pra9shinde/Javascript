const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardEl = [];

// Store Card Data
const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];

// Create All Cards
function createCards() {
    cardsData.forEach((data, index) => {
        createCard(data, index);
    });
}

// Create Single Card in the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardEl.push(card);
    cardsContainer.appendChild(card);


    updateCurrentText();
}

// Show no.of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardEl.length}`;
}


// Get Cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}


// Add Card to localstorage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// Event Listener
nextBtn.addEventListener('click', () => {
    cardEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardEl.length - 1) {
        currentActiveCard = cardEl.length - 1;
    }

    cardEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

prevBtn.addEventListener('click', () => {
    cardEl[currentActiveCard].className = 'card ';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

// Show add Container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add Container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';
        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// clear cards btn
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})