let requestUrl = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7';

const cardsContainer = document.querySelector('.cards');

//create card item
const createCard = (card) => `
<div class="card">
                    <h4 class="card__title">${card.title}</h4>
                    <p class="card__text">${card.body}</p>
                    <div class="card__checkbox checkbox">
                        <input type="checkbox" id="card${card.id}" class="checkbox__input"/>
                        <label for="card${card.id}" class="checkbox__label"></label>
                    </div>
                </div>
`

//add cards to card's container
const fillCardsContainer = (cards) => {
    cardsContainer.innerHTML = "";
    if (cards.length) {
        cards.forEach((card) => cardsContainer.innerHTML += createCard(card))
    }
}

//send request for getting card's array
async function getCardsRequest(url) {
    cardsContainer.innerHTML = "";
    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((cards) => {
            if (cards.length) {
                fillCardsContainer(cards);
                checkCard();
            }
        }).catch(err => console.log(err))
}

//the first call when the application is loaded
getCardsRequest(requestUrl);


const filterCardsBtn = document.querySelector('.filter__button');

//filter cards according to their title and input value
filterCardsBtn.addEventListener('click', () => {
    let value = document.querySelector('.text__input').value;
    if (value) {
        requestUrl += `&title=${value}`;
        getCardsRequest(requestUrl);
    }
})


//change color of the checked/unchecked card
const checkCard = () => {

    const cardCheckboxes = document.querySelectorAll('.checkbox__input');
    cardCheckboxes.forEach((cardCheckbox) => {
        cardCheckbox.addEventListener('change', (e) => {
            let targetCheckbox = e.target;
            let targetCard = targetCheckbox.parentElement.parentElement;
            if (targetCheckbox.checked) {
                targetCard.classList.add("card_checked");
            } else {
                targetCard.classList.remove("card_checked");
            }
        })
    })
}



