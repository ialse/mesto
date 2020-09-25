import {profileName, profileWork} from '../utils/nodes.js'; //импорт констант с узлами страницы


import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, /*колбэк сабмита формы*/) {
        super(popupSelector);
    }

    _getInputValues () {
        this._popup.querySelector('popup__input_name').value = profileName.textContent;
        this._popup.querySelector('popup__input_work').value = profileWork.textContent;
    }

    close() {
        super.close();

        /*reset*/
    }

    setEventListeners() {
        super.setEventListeners();

        /*обработка сабмита*/
    }
}