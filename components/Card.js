export default class Card {

    constructor(data, { openImagePopup }, cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
        this._openImagePopup = openImagePopup;
    }

    // Получаем шаблон карточки
    _getTemplate() {
        this._card = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    // Получаем ссылку и название карточки
    getCardInfo() {
        const name = this._name;
        const link = this._link;
        return { name, link };
    }

    // Обработчик события, отвечающий за работу лайка
    _addHandlerLike(like) {
        like.classList.toggle('element__button-like_active');
    }

    // Обработчик события, удаляющий карточку
    _addHandlerBtnRemove() {
        this._card.remove();
        this._card = null;
    }

    // Установка слушателей
    _setEventListeners() {
        const like = this._card.querySelector('.element__button-like');
        const btnRemove = this._card.querySelector('.element__button-remove');
        const image = this._card.querySelector('.element__image');

        like.addEventListener('click', () => { this._addHandlerLike(like); });
        btnRemove.addEventListener('click', () => { this._addHandlerBtnRemove(); });
        image.addEventListener('click', () => { this._openImagePopup(); });
    }

    // Создаем карточку
    createCard() {
        this._getTemplate();

        const elementImage = this._card.querySelector('.element__image');
        const elementTitle = this._card.querySelector('.element__title');

        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementTitle.textContent = this._name;

        this._setEventListeners();

        return this._card;
    }
}