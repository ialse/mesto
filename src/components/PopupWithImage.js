import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this.popup.querySelector(".popup__image");
    this._title = this.popup.querySelector(".popup__title");
  }

  // Открываем попап Добавления карточки, дополнительно вставлям ссылку, alt и название
  open({name, link}) {
    super.open();
    
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
