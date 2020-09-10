export default class Card {

    constructor (data, cardTemplate, createImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._createImagePopup = createImagePopup;
    }

    /*Создаем карточку*/
    createCard () {
        this._card = document.querySelector(this._cardTemplate).content.cloneNode(true);

        const elementImage = this._card.querySelector('.element__image');
        const elementTitle = this._card.querySelector('.element__title');

        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementTitle.textContent = this._name;

        this._addHandlerCard(this._card); /*Навешиваем обработчики*/

        return this._card;
    }

    /*Функция, навешивающая обработчики на карточки*/
    _addHandlerCard (card) {
        /*каждой кнопке навешиваем обработчик события, отвечающий за работу лайка*/
        card.querySelector('.element__button-like').addEventListener('click', event => {
            event.currentTarget.classList.toggle('element__button-like_active');
        });

        /*каждой картинке навешиваем обработчик события: клик по картинке - открывается попап с картинкой*/
        card.querySelector('.element__image').addEventListener('click', this._createImagePopup);

        /*каждой кнопке удаления навешиваем обработчик события, удаляющий карточку*/
        card.querySelector('.element__button-remove').addEventListener('click', event => {
            event.currentTarget.closest('.element').remove();
        });
    }
}