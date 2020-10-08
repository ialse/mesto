import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    //навешиваем обработчик кнопки Да
    this.popup.addEventListener("submit", () => {
      this._handleSubmit();
    });
  }
}
