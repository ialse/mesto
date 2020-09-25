import * as nodes from '../utils/nodes.js'; //импорт констант с узлами страницы
import { initialCards } from '../utils/initial-cards.js'; //импорт массива с данными начальных карточек
import Card from '../components/Card.js'; //импорт класса, отвечающего за создание карточек
import Section from '../components/Section.js'; //импорт класса, отвечающего за создание карточек
import FormValidator from '../components/FormValidator.js'; //импорт класса, отвечающего за валидацию форм

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

/*Создаем объект*/
const cardsList = new Section({
    data: initialCards,
    renderer: (item) => {

        const card = new Card(data, '#card-template', openImagePopup); /*Создаем объект карточки*/
        const cardNode = card.createCard(); /*Вставляем разметку*/
  
        cardsList.addItem(cardElement);
      },
    },
    nodes.elements
  );

// отрисовка карточек
cardsList.renderItems();

/*Открываем попап*/
function openPopup(popup) {
    addHandlerPopup(popup);
    popup.classList.add('popup_opened');
}

/*Функция, закрывающая попап по Escape */
function closeEscape(evt) {
    const popupActive = document.querySelector('.popup_opened');

    if (evt.key === 'Escape') {
        closePopup(popupActive);
    }
}

/*Функция, закрывающая попап при клике по оверлею*/
function closeClickOverlay(evt) {
    const popupActive = document.querySelector('.popup_opened');

    if (evt.target === popupActive) {
        closePopup(popupActive);
    }
}

/*Навешиваем обработчики для закрытия попапа по Escape и по клику по оверлею*/
function addHandlerPopup(popup) {
    document.body.addEventListener('keyup', closeEscape);
    popup.addEventListener('mousedown', closeClickOverlay);
}

/*Удаляем обработчики*/
function removeHandlerPopup(popup) {
    document.body.removeEventListener('keyup', closeEscape);
    popup.removeEventListener('mousedown', closeClickOverlay);
}

/*Настраиваем попап EditProfile*/
function openEditProfilePopup() {
    editProfileValidation.resetForm(); //очищаю поля, тексты ошибок и блокирую кнопку
    nodes.inputName.value = nodes.profileName.textContent;
    nodes.inputWork.value = nodes.profileWork.textContent;
    openPopup(nodes.popupEditProfile);
}

/*Настраиваем попап AddCard*/
function openAddCardPopup() {
    addCardValidation.resetForm(); //очищаю поля, тексты ошибок и блокирую кнопку
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

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandlerPopup(popup);
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
    const card = new Card(data, '#card-template', openImagePopup);
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