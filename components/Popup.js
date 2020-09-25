export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    open() {
        this._popup.setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close() {
        popup.classList.remove('popup_opened');
        removeHandlerPopup(popup);
    }

    _handleEscClose() {
        const popupActive = document.querySelector('.popup_opened');

        if (this._popup === 'Escape') {
            close(popupActive);
        }
    }

    _handleClickOverlayClose() {
        const popupActive = document.querySelector('.popup_opened');

        if (this._popup === popupActive) {
        this.close(popupActive);
        }
    }

    setEventListeners () {
        document.body.addEventListener('keyup', _handleEscClose);
        this._popup.addEventListener('mousedown', _handleClickOverlayClose);
    }
}