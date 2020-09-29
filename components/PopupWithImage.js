import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._title = data.name;
        this._image = data.link;
    }

    //Открываем попап Добавления карточки, дополнительно вставлям ссылку, alt и название
    open() {
        super.open();
        this._popup.querySelector('.popup__image').src = this._image;
        this._popup.querySelector('.popup__image').alt = this._title;
        this._popup.querySelector('.popup__title').textContent = this._title;
    }
}