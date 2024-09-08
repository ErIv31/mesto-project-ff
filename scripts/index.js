// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const currentCard = cardTemplate.cloneNode(true);
  currentCard.querySelector(".card__title").textContent = cardData.name;
  currentCard.querySelector(".card__image").src = cardData.link;
  currentCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return currentCard;
}

// @todo: Функция удаления карточки
const deleteCard = (event) => {
  event.target.closest(".card").remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard));
});
