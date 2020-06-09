const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransaction = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add  transaction 
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }

}

//generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//Add Transcations to list DOM
function addTransactionDOM(transcation) {
    //Get sign
    const sign = transcation.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //Add class based on the amount
    item.classList.add(transcation.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transcation.text} <span>${sign}${Math.abs(transcation.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transcation.id})">x<button>
    `;

    list.appendChild(item);
}

//Update the balance income and expense
function updateValues() {
    const amounts = transactions.map(transcation => transcation.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Remove Transaction by Id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();

form.addEventListener('submit', addTransaction);

