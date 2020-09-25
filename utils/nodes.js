/*Создаем переменную с секцией карточек*/
export const elements = document.querySelector('.elements');

/* Кнопки */
export const btnEdit = document.querySelector('.profile__button-edit');
export const btnsClose = document.querySelectorAll('.popup__btn-close');
export const btnAdd = document.querySelector('.profile__button-add');

/* Поля на странице*/
export const profileName = document.querySelector('.profile__title');
export const profileWork = document.querySelector('.profile__subtitle');

/* Всплывающие окна, их поля и кнопки */
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const inputName = popupEditProfile.querySelector('.popup__input_name');
export const inputWork = popupEditProfile.querySelector('.popup__input_work');
export const formSaveEditProfile = popupEditProfile.querySelector('.popup__form');
export const btnCloseEditProfile = popupEditProfile.querySelector('.popup__btn-close');

export const popupAddCard = document.querySelector('.popup_add-card');
export const inputPlace = popupAddCard.querySelector('.popup__input_place');
export const inputLink = popupAddCard.querySelector('.popup__input_link');
export const formSaveAddCard = popupAddCard.querySelector('.popup__form');
export const btnCloseAddCard = popupAddCard.querySelector('.popup__btn-close');

export const popupImage = document.querySelector('.popup_image');
export const elementImage = popupImage.querySelector('.popup__image');
export const elementTitle = popupImage.querySelector('.popup__title');
export const btnCloseImage = popupImage.querySelector('.popup__btn-close');