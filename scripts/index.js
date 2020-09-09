import * as nodes from './nodes.js';
import {initialCards} from './initial-сards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/*Открываем попап*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

/*Функция, закрывающая попап по Escape или при клике по оверлею*/
function closeEscapeAndClickOverlay(evt) {
    const popupActive = document.querySelector('.popup_opened');

    if (evt.key === 'Escape' || evt.target === popupActive) {
        closePopup(popupActive);
    }
}

/*Навешиваем обработчики для закрытия попапа по Escape и по клику по оверлею*/
function addHandlerPopup(popup) {
    document.body.addEventListener('keyup', closeEscapeAndClickOverlay);
    popup.addEventListener('click', closeEscapeAndClickOverlay);
}

/*Удаляем обработчики*/
function removeHandlerPopup(popup) {
    document.body.removeEventListener('keyup', closeEscapeAndClickOverlay);
    popup.removeEventListener('click', closeEscapeAndClickOverlay);
}

/*Настраиваем попап EditProfile*/
function createEditProfilePopup() {
    nodes.inputName.value = nodes.profileName.textContent;
    nodes.inputWork.value = nodes.profileWork.textContent;

    addHandlerPopup(nodes.popupEditProfile);
    openPopup(nodes.popupEditProfile);
}

/*Настраиваем попап AddCard*/
function createAddCardPopup() {
    nodes.popupAddCard.firstElementChild.reset(); //очищаю поля, так как окно просто скрывается

    addHandlerPopup(nodes.popupAddCard);

    const data = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__btn-save',
        inactiveButtonClass: 'popup__btn-save_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    const formValidation = new FormValidator(data, nodes.popupAddCard); /*Создаем объект*/
    formValidation.enableValidation(); /*включаем валидацию объекта*/
    openPopup(nodes.popupAddCard);
}

/*Настраиваем попап Image*/
export function createImagePopup(e) {
    const image = e.target.src;
    const title = e.target.nextElementSibling.textContent;

    nodes.elementImage.src = image
    nodes.elementImage.alt = title;
    nodes.elementTitle.textContent = title;

    addHandlerPopup(nodes.popupImage);
    openPopup(nodes.popupImage);
}

/*Очищаем тексты ошибок на тот случай, когда попап закрывается с текстом ошибок,
чтобы при его открытии не было видно ошибок, хотя форма может быть заполнена правильно.
По рекомендациям наставника enableValidation() должна вызываться только один раз, поэтому 
делаю отдельную функцию*/
/*function clearErrorPopup(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        hideInputError({
                inputErrorClass: 'popup__input_type_error',
                errorClass: 'popup__error_visible'
            },
            popup, inputElement);
    });
}*/

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandlerPopup(popup);
   /* clearErrorPopup(popup);*/
}

/*Функция, отрабатывающая при нажатии кнопки сохранить в попапе с редактированием профиля*/
function saveEditProfilePopup(e) {
    e.preventDefault();

    nodes.profileName.textContent = nodes.inputName.value;
    nodes.profileWork.textContent = nodes.inputWork.value;
    closePopup(nodes.popupEditProfile);
}

/*Создание и добавление карточки на страницу*/
function addCard(data) {
    const card = new Card (data, '#card-template'); /*Создаем объект с данными*/
    const cardNode = card.createCard(); /*Вставляем разметку*/
    nodes.elements.prepend(cardNode); /*Добавляем сформированную карточку в начало страницы*/
}

/*Функция, отрабатывающая при нажатии кнопки создать в попапе с добавлением карточки*/
function saveAddCardPopup(e) {
    e.preventDefault();

    const data = {
        name: nodes.inputPlace.value,
        link: nodes.inputLink.value
    }    
    
    addCard(data);
    closePopup(nodes.popupAddCard);
}

/*Добавляем на страницу начальные карточки */
initialCards.forEach(function(item) {
    addCard(item);
});

/*Навешиваем обработчики*/
nodes.btnEdit.addEventListener('click', createEditProfilePopup);
nodes.btnAdd.addEventListener('click', createAddCardPopup);

nodes.btnCloseEditProfile.addEventListener('click', () => closePopup(nodes.popupEditProfile));
nodes.btnCloseAddCard.addEventListener('click', () => closePopup(nodes.popupAddCard));
nodes.btnCloseImage.addEventListener('click', () => closePopup(nodes.popupImage));

nodes.formSaveEditProfile.addEventListener('submit', saveEditProfilePopup);
nodes.formSaveAddCard.addEventListener('submit', saveAddCardPopup);