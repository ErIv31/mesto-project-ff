// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const currentCard = cardTemplate.cloneNode(true);
  const cardImage = currentCard.querySelector(".card__image");

  currentCard.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
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
