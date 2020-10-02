import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Открываем попап Добавления карточки, дополнительно вставлям ссылку, alt и название
  open({name, link}) {
    super.open();
    const image = this.popup.querySelector(".popup__image");
    const title = this.popup.querySelector(".popup__title");
    
    image.src = link;
    image.alt = name;
    title.textContent = name;
  }
}
