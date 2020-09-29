export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (evt) => {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.key === 'Escape') {
            this.close(popupActive);
        }
    }

    _handleClickOverlayClose = (evt) => {
        const popupActive = document.querySelector('.popup_opened');
        if (evt.target === popupActive) {
            this.close(popupActive);
        }
    }

    setEventListeners() {
        this._popup.addEventListener('keyup', this._handleEscClose); //работает, только если поле в фокусе
        document.body.addEventListener('mousedown', this._handleClickOverlayClose);
        this._popup.querySelector('.popup__btn-close').addEventListener('click', this.close);
    }

    open = () => {
        this._popup.classList.add('popup_opened');
    }

    /* для попапа профиля не работает стрелочная ф, 
    для попапа картинки не работает обычная (this._popup = undefined)*/
    close = () =>  {
        this._popup.classList.remove('popup_opened');
    }
}