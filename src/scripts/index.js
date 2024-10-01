import '../pages/index.css';

import { initialCards } from './components/cards';

import { createCard, deleteCard, likeCard } from './components/card';

import { openModal, closeModal } from './components/modal';

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");



// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard));
});
