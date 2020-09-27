import { btnCloseEditProfile, btnCloseAddCard } from '../utils/nodes.js'; //импорт констант с узлами страницы

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (evt) => {
        const popupActive = document.querySelector('.popup_opened');
        console.log('evt');
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

    /*При обычном объявлении почему то теряется контекст*/
    open = () => {
        this.setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    /*А тут наоборот, при стрелочной функции что то не так работает*/
    close() {
        this._popup.classList.remove('popup_opened');
    }




}