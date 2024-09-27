

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");



// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard));
});
