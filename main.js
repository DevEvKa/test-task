let requestUrl = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7';


const cardsContainer = document.querySelector('.cards');



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

const fillCardsContainer = (cards) => {
    console.log('fill', cards)
    cardsContainer.innerHTML = "";
    if (cards.length) {
        cards.forEach((card) => cardsContainer.innerHTML += createCard(card))
    }
}





//запрос на получение карточек
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

//вызов при загрузке страницы
getCardsRequest(requestUrl);



//изменение цвета(выбор) карточки
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

const filterCardsBtn = document.querySelector('.filter__button');

filterCardsBtn.addEventListener('click', () => {
    let value = document.querySelector('.text__input').value;
    requestUrl += `&title=${value}`;
    getCardsRequest(requestUrl);
})



//https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7&title=eum et est occaecati



