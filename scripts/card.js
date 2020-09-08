import initialCards from './initial-сards.js';

class Card {

    constructor (name, link) {
        this._name = name;
        this._link = link;
    }

/*Создаем карточку*/
_createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    const elementTitle = card.querySelector('.element__title')

    elementImage.src = link;
    elementImage.alt = name;
    elementTitle.textContent = name;

    addHandlerCard(card); /*Навешиваем обработчики*/

    return card;
}

/*Функция, навешивающая обработчики на карточки*/
_addHandlerCard(card) {
    /*каждой кнопке навешиваем обработчик события, отвечающий за работу лайка*/
    card.querySelector('.element__button-like').addEventListener('click', event => {
        event.currentTarget.classList.toggle('element__button-like_active');
    });

    /*каждой картинке навешиваем обработчик события: клик по картинке - открывается попап с картинкой*/
    card.querySelector('.element__image').addEventListener('click', openImagePopup);

    /*каждой кнопке удаления навешиваем обработчик события, удаляющий карточку*/
    card.querySelector('.element__button-remove').addEventListener('click', event => {
        event.currentTarget.closest('.element').remove();
    });
}

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    const card = createCard(name, link); /*Создаем карточку*/
    elements.prepend(card); /*Добавляем сформированную карточку в начало страницы*/
}

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

/*Настраиваем попап Image*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.nextElementSibling.textContent;

    elementImage.src = image
    elementImage.alt = title;
    elementTitle.textContent = title;

    addHandlerPopup(popupImage);
    openPopup(popupImage);
}

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandlerPopup(popup);
    clearErrorPopup(popup);
}


/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    const card = new Card (item.name, item.link);
});

}

btnCloseImage.addEventListener('click', () => closePopup(popupImage));