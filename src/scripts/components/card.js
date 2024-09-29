// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(cardData, deleteCard, likeCard, zoomCard) {
  const currentCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = currentCard.querySelector(".card__image");

  currentCard.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  currentCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  currentCard
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  cardImage.addEventListener("click", () =>
    zoomCard(cardData.link, cardData.name)
  );

  return currentCard;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}

// @todo: Функция лайка карточки
function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
