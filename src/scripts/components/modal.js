// @todo: Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
  document.addEventListener("click", closeModalOverlay);
  popup
    .querySelector(".popup__close")
    .addEventListener("click", closeModalCloseButton);
}

// @todo: Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
  document.removeEventListener("click", closeModalOverlay);
  popup
    .querySelector(".popup__close")
    .addEventListener("click", closeModalCloseButton);
}

// @todo: Функция закрытия модального окна по кнопке Esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// @todo: Функция закрытия модального окна по крестику в модальном окне
function closeModalCloseButton(event) {
  closeModal(event.target.closest(".popup"));
}

// @todo: Функция закрытия модального окна по оверлею
function closeModalOverlay(event) {
  const { target } = event;

  if (target.classList.contains("popup")) {
    closeModal(target);
  }
}
