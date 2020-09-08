import initialCards from './initial-сards.js';

class Card {

    constructor (item, cardTemplate) {
        this._name = item.name;
        this._link = item.link;
        this._cardTemplate = cardTemplate;
    }

/*Создаем карточку*/
_createCard() {
    const card = document.querySelector(this._cardTemplate).cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    const elementTitle = card.querySelector('.element__title')

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;

    _addHandlerCard(card); /*Навешиваем обработчики*/

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

/*Функция, добавляющая карточку на страницу*/
addCard() {
    const card = _createCard(name, link); /*Создаем карточку*/
    elements.prepend(card); /*Добавляем сформированную карточку в начало страницы*/
}
}

/*Добавляем на страницу начальные карточки */
initialCards.forEach(function(item) {
    const card = new Card (item, '#card-template');

    card.addCard();
});
