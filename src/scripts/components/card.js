import { addLike, removeLike } from "./api.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(cardData, userID, deleteCard, likeCard, zoomCard) {
  const currentCard = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = currentCard.querySelector(".card__image");
  const cardTitle = currentCard.querySelector(".card__title");
  const cardDeleteButton = currentCard.querySelector(".card__delete-button");
  const cardLikeButton = currentCard.querySelector(".card__like-button");
  const likeCount = currentCard.querySelector(".card__like-counts");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.owner._id == userID) {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(currentCard, cardData._id);
    });
  } else {
    cardDeleteButton.setAttribute("style", `display: none;`);
  }

  if (
    cardData.likes.some((likedUser) => {
      likedUser._id == userID;
    })
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (event) =>
    likeCard(event.target, likeCount, cardData._id)
  );
  cardImage.addEventListener("click", () =>
    zoomCard(cardData.link, cardData.name)
  );

  return currentCard;
}

//Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

//Функция лайка карточки
export function likeCard(event, cardId, likeCount) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((card) => {
        likeCount.textContent = card.likes.length;
        event.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    addLike(cardId)
      .then((card) => {
        likeCount.textContent = card.likes.length;
        event.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
