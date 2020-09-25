import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._title = data.title;
		this._image = data.image;
    }

    open() {
        super.open();
        super.setEventListeners();
    
        this._popup.querySelector('.popup__image').src = this._image;
        this._popup.querySelector('.popup__image').alt = this._title;
        this._popup.querySelector('.popup__title').textContent = this._title;        
    
        return this._popup;
    }
}