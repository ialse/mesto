export default class Card {

    constructor(data, cardTemplate, createImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._createImagePopup = createImagePopup;
        this._card = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    /*Обработчик события, отвечающий за работу лайка*/
    _addHandlerLike() {
        const like = this._card.querySelector('.element__button-like');
        like.addEventListener('click', () => {
            like.classList.toggle('element__button-like_active');
        });
    }

    /*Обработчик события, удаляющий карточку*/
    _addHandlerBtnRemove() {
        const btnRemove = this._card.querySelector('.element__button-remove');
        btnRemove.addEventListener('click', () => {
            btnRemove.closest('.element').remove();
        });
    }

    /*Обработчик события, удаляющий карточку*/
    _addHandlerBtnRemove(btnRemove) {
        this._card.remove();
        this._card = null;
    }

    /*Создаем карточку*/
    createCard() {
        const elementImage = this._card.querySelector('.element__image');
        const elementTitle = this._card.querySelector('.element__title');

        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementTitle.textContent = this._name;

        /*Навешиваем обработчики*/
        this._addHandlerLike();
        this._addHandlerClickImage();
        this._addHandlerBtnRemove();

        return this._card;
    }
}