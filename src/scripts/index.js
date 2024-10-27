import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserProfile,
  editUserAvatar,
  editUserProfile,
  addNewCard,
  removeCard,
} from "./components/api.js";

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// @todo: DOM узлы

const userData = {
  userName: document.querySelector(".profile__title"),
  userAbout: document.querySelector(".profile__description"),
  userAvatar: document.querySelector(".profile__image"),
};

const promises = [getUserProfile(), getInitialCards()];

const cardList = document.querySelector(".places__list");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const addProfileButton = profile.querySelector(".profile__add-button");
const editProfileButton = profile.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupTypeAvatar = document.querySelector(".popup_type_edit-avatar");
const inputPopupName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const inputPopupDescription = popupEditProfile.querySelector(
  ".popup__input_type_description"
);
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = popupNewCard.querySelector(".popup__form");
const inputCardName = formNewCard.querySelector(".popup__input_type_card-name");
const inputCardUrl = formNewCard.querySelector(".popup__input_type_url");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const inputUserAvatar = popupTypeAvatar.querySelector(
  ".popup__input_type_avatar"
);
const formUserAvatar = popupTypeAvatar.querySelector(".popup__form");
const userAvatar = profile.querySelector(".profile__image");

// Функция загрузки пользователя
function renderProfile(user, userData) {
  userData.userName.textContent = user.name;
  userData.userAbout.textContent = user.about;
  userData.userAvatar.setAttribute(
    "style",
    `background-image: usrl(${user.avatar});`
  );
}

// Функция прорисовки загрузки
function renderLoading(isLoading, element) {
  if (isLoading) {
    element.textContent = "Сохранение...";
  } else {
    element.textContent = "Сохранить";
  }
}

// Функция увелечения карточки
function zoomCard(url, name) {
  popupCaption.textContent = name;
  popupImage.src = url;
  popupImage.alt = name;

  openModal(popupTypeImage);
}

// Функция открытия модального окна с карточкой
function openModalNewCard() {
  openModal(popupNewCard);
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
}

// Функция удаления карточки
function eraseCard(card, cardId) {
  removeCard(cardId)
    .then(() => {
      deleteCard(card);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// Функция открытия модального окна с редактированием профиля
function openModalEditProfile() {
  inputPopupName.value = profileTitle.textContent;
  inputPopupDescription.value = profileDescription.textContent;

  clearValidation(popupEditProfile, validationConfig);

  openModal(popupEditProfile);
}

// Функция сохранения профиля по кнопке "Сохранить"
function submitProfileEdit(event) {
  event.preventDefault();

  const loadingButtonStatus = event.target.querySelector(".popup__button");

  renderLoading(true, loadingButtonStatus);

  editUserProfile(inputPopupName.value, inputPopupDescription.value)
    .then((user) => {
      editUserProfile(user.name, user.about);
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, loadingButtonStatus);
    });
}

// Функция создания новой карточки по кнопке "Сохранить"
function submitNewCard(event) {
  event.preventDefault();

  const loadingButtonStatus = event.target.querySelector(".popup__button");

  renderLoading(true, loadingButtonStatus);

  addNewCard(inputCardName.value, inputCardUrl.value)
    .then((card) => {
      const newCard = createCard(
        card,
        card.owner._id,
        eraseCard,
        likeCard,
        zoomCard
      );
      cardList.prepend(newCard);
      closeModal(popupNewCard);
      formNewCard.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, loadingButtonStatus);
    });
}

// Функция открытия модального окна с изменением аватара пользователя
function openModalEditUserAvatar() {
  openModal(popupTypeAvatar);
  formUserAvatar.reset();
  clearValidation(popupTypeAvatar, validationConfig);
}

// Функция изменения аватара пользователя по кнопке "Сохранить"
function submitUserAvatar(event) {
  event.preventDefault();

  const avatarUrl = inputUserAvatar.value;
  const loadingButtonStatus = event.target.querySelector(".popup__button");

  userAvatar.setAttribute("style", `background-image: url(${avatarUrl});`);

  renderLoading(true, loadingButtonStatus);

  editUserAvatar(avatarUrl)
    .then((user) => {
      editUserAvatar(user.avatar);
      closeModal(popupTypeAvatar);
      formUserAvatar.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, loadingButtonStatus);
    });
}

// Функция добавления карточки в массив карточек
function addCard(card) {
  cardList.append(card);
}

// Вывод данных пользователя и карточек с сервера
Promise.all(promises)
  .then((element) => {
    renderProfile(element[0], userData);
    element[1].forEach((elem) => {
      addCard(createCard(elem, element[0]._id, eraseCard, likeCard, zoomCard));
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

enableValidation(validationConfig);

// Открытие модального окна редактирования профиля и добавления новых карточек по клику
editProfileButton.addEventListener("click", openModalEditProfile);
addProfileButton.addEventListener("click", openModalNewCard);
userAvatar.addEventListener("click", openModalEditUserAvatar);

// Обработка кнопки "Сохранить" модального окна
popupEditProfile.addEventListener("submit", submitProfileEdit);
popupNewCard.addEventListener("submit", submitNewCard);
popupTypeAvatar.addEventListener("submit", submitUserAvatar);
