import { btnCloseEditProfile, btnCloseAddCard } from '../utils/nodes.js'; //импорт констант с узлами страницы


import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, /*колбэк сабмита формы*/ ) {
        super(popupSelector);

    }

    _getInputValues = () => {

        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._popupValues = {};
        this._inputList.forEach(input => this._popupValues[input.name] = input.value);

        return this._inputList;
        /*this._popup.querySelector('popup__input_name').value = profileName.textContent;
        this._popup.querySelector('popup__input_work').value = profileWork.textContent;*/
    }

    close = () => {
        super.close();

        /*reset*/
    }

    _handleSubmit = () => {
        const inputList = this._getInputValues();

    }

    setEventListeners = () => {
        super.setEventListeners();

        this._popup.addEventListener('submit', this._handleSubmit)
            /*обработка сабмита*/

    }
}