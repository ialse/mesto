export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
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

    //Открываем попап
    open() {
        this._popup.classList.add('popup_opened');
    }

    //Закрываем попап
    close() {
        this._popup.classList.remove('popup_opened');
    }

    //Навешиваем обработчики закрытия попапа
    setEventListeners() {
        this._popup.addEventListener('keyup', this._handleEscClose.bind(this)); //работает, только если поле в фокусе
        document.body.addEventListener('mousedown', this._handleClickOverlayClose.bind(this));
        this._popup.querySelector('.popup__btn-close').addEventListener('click', () => this.close());
    }
}