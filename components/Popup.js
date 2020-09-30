export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClickOverlayClose = this._handleClickOverlayClose.bind(this);
        this.close = this.close.bind(this);
    }

    // Обработчик нажатия Escape - закрывает попап
    _handleEscClose(evt) {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    // Обработчик клика по оверлею - закрывает попап
    _handleClickOverlayClose(evt) {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.target === popupActive) {
            this.close();
        }
    }

    // Открываем попап
    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    // Закрываем попап
    close() {
        this._popup.classList.remove('popup_opened');
    }

    // Удаляем обработчики закрытия попапа
    _removeEventListeners() {
        document.body.removeEventListener('keyup', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._handleClickOverlayClose);
        this._popup.querySelector('.popup__btn-close').removeEventListener('click', this.close);
    }

    // Добавляем обработчики закрытия попапа
    setEventListeners() {
        document.body.addEventListener('keyup', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleClickOverlayClose);
        this._popup.querySelector('.popup__btn-close').addEventListener('click', this.close);
    }
}