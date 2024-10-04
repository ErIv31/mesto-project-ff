import "../pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const addProfileButton = profile.querySelector(".profile__add-button");
const editProfileButton = profile.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const inputPopupName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const inputPopupDescription = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const form = popupNewCard.querySelector(".popup__form");
const inputCardName = form.querySelector(".popup__input_type_card-name");
const inputCardUrl = form.querySelector(".popup__input_type_url");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// @todo: Функция увелечения карточки
function zoomCard(url, name) {
  popupCaption.textContent = name;
  popupImage.src = url;
  popupImage.alt = name;

  openModal(popupTypeImage);
}

// @todo: Функция открытия модального окна с карточкой
function openModalNewCard() {
  openModal(popupNewCard);
}

// @todo: Функция открытия модального окна с редактированием профиля
function openModalEditProfile() {
  inputPopupName.value = profileTitle.textContent;
  inputPopupDescription.value = profileDescription.textContent;

  openModal(popupEditProfile);
}

// @todo: Функция сохранения профиля по кнопке "Сохранить"
function submitProfileEdit(event) {
  event.preventDefault();

  profileTitle.textContent = inputPopupName.value;
  profileDescription.textContent = inputPopupDescription.value;

  closeModal(popupEditProfile);
}

// @todo: Функция создания новой карточки по кнопке "Сохранить"
function submitNewCard(event) {
  event.preventDefault();

  const cardData = {
    name: inputCardName.value,
    link: inputCardUrl.value,
  };

  const newCard = createCard(cardData, deleteCard, likeCard, zoomCard);

  cardList.prepend(newCard);
  closeModal(popupNewCard);
  form.reset();
}

// @todo: Функция добавления карточки в массив карточек
function addCard(card) {
  cardList.append(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  addCard(createCard(cardData, deleteCard, likeCard, zoomCard));
});

// @todo: Открытие модального окна редактирования профиля и добавления новых карточек по клику
editProfileButton.addEventListener("click", openModalEditProfile);
addProfileButton.addEventListener("click", openModalNewCard);

// @todo: Обработка кнопки "Сохранить" модального окна
popupEditProfile.addEventListener("submit", submitProfileEdit);
popupNewCard.addEventListener("submit", submitNewCard);
