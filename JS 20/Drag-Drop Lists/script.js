const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zukerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// Store List items
const listItems = [];

let dragStartIndex;

createList();

// Insert List items into DOM
function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() })) //returns array of object which stores value and a random number
        .sort((a, b) => a.sort - b.sort) // Values are sorted asc based on random number
        .map(a => a.value) //Return only values from the object
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}<p>
                <i class="fa fa-bars"></i>
            </div>
        `;

            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
    // console.log('DRAGSTART');
    dragStartIndex = +this.closest('li').getAttribute('data-index'); //gives the index of item which user dragged
}

function dragOver(e) {
    // console.log('dragOver');
    e.preventDefault();
}

function dragDrop() {
    // console.log('dragDrop');
    const dragEndIndex = +this.getAttribute('data-index'); //gives the index of item where user dropped
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');

}

function dragEnter() {
    // console.log('dragEnter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('dragLeave');
    this.classList.remove('over');

}

function swapItems(from, to) {
    const itemOne = listItems[from].querySelector('.draggable');
    const itemTwo = listItems[to].querySelector('.draggable');

    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}


function checkOrder() {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');

        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);