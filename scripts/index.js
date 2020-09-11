import * as nodes from './nodes.js'; //импорт констант с узлами страницы
import {initialCards} from './initial-сards.js'; //импорт массива с данными начальных карточек
import Card from './Card.js';  //импорт класса, отвечающего за создание карточек
import FormValidator from './FormValidator.js'; //импорт класса, отвечающего за валидацию форм

/*Объект с селекторами формы*/
const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, nodes.popupEditProfile);
const addCardValidation = new FormValidator(formSelectors, nodes.popupAddCard); 

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

/*Открываем попап*/
function openPopup(popup) {
    addHandlerPopup(popup);
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
    popup.addEventListener('mousedown', closeEscapeAndClickOverlay);
}

/*Удаляем обработчики*/
function removeHandlerPopup(popup) {
    document.body.removeEventListener('keyup', closeEscapeAndClickOverlay);
    popup.removeEventListener('mousedown', closeEscapeAndClickOverlay);
}

/*Настраиваем попап EditProfile*/
function openEditProfilePopup() {
    editProfileValidation.resetForm(); //очищаю тексты ошибок и блокирую кнопку
    nodes.inputName.value = nodes.profileName.textContent;
    nodes.inputWork.value = nodes.profileWork.textContent;    
    openPopup(nodes.popupEditProfile);
}

/*Настраиваем попап AddCard*/
function openAddCardPopup() {
    addCardValidation.resetForm(); //очищаю тексты ошибок и блокирую кнопку
    nodes.popupAddCard.querySelector('.popup__form').reset(); //очищаю поля, так как окно просто скрывается    
    openPopup(nodes.popupAddCard);
}

/*Настраиваем попап Image*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.closest('.element').querySelector('.element__title').textContent;

    nodes.elementImage.src = image
    nodes.elementImage.alt = title;
    nodes.elementTitle.textContent = title;

    openPopup(nodes.popupImage);
}

/*Очищаем тексты ошибок и ставим кнопку неактивной на тот случай, когда попап закрывается
с текстом ошибок, чтобы при его открытии не было видно ошибок,
хотя форма может быть заполнена правильно.*/
/*function clearErrorPopup(popup) {
    /*проверяем какой попап открыт и берем ссылку на нужный объект*/
   /* const formClear = popup.classList.contains('popup_edit-profile') ? editProfileValidation :
                      popup.classList.contains('popup_add-card') ? addCardValidation : null;

    if(!formClear)  return; //Если закрывают попап с картинкой, то выходим из функции    
    formClear.resetForm(); //Вызываем метод для открытого объекта
}*/

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandlerPopup(popup);
    clearErrorPopup(popup);
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
    /*Создаем объект с данными, третьим параметром передаю функцию обработчик для слушателя событий*/
    const card = new Card (data, '#card-template', openImagePopup); 
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
nodes.btnEdit.addEventListener('click', openEditProfilePopup);
nodes.btnAdd.addEventListener('click', openAddCardPopup);

nodes.btnCloseEditProfile.addEventListener('click', () => closePopup(nodes.popupEditProfile));
nodes.btnCloseAddCard.addEventListener('click', () => closePopup(nodes.popupAddCard));
nodes.btnCloseImage.addEventListener('click', () => closePopup(nodes.popupImage));

nodes.formSaveEditProfile.addEventListener('submit', saveEditProfilePopup);
nodes.formSaveAddCard.addEventListener('submit', saveAddCardPopup);