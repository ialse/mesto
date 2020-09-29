export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (evt) => {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickOverlayClose = (evt) => {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.target === popupActive) {
            this.close();
        }
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    setEventListeners() {
        this._popup.addEventListener('keyup', this._handleEscClose.bind(this)); //работает, только если поле в фокусе
        document.body.addEventListener('mousedown', this._handleClickOverlayClose.bind(this));
        this._popup.querySelector('.popup__btn-close').addEventListener('click', () => this.close());
    }
}