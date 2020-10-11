export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayClose = this._handleClickOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }

  // Обработчик нажатия Escape - закрывает попап
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Обработчик клика по оверлею - закрывает попап
  _handleClickOverlayClose(evt) {
    if (evt.target === this.popup) {
      this.close();
    }
  }

  // Открываем попап
  open() {
    this.popup.classList.add("popup_opened");
    this._setCloseEventListeners();
  }

  // Закрываем попап
  close() {
    this.popup.classList.remove("popup_opened");
    this._removeCloseEventListeners();
  }

  // Удаляем обработчики закрытия попапа
  _removeCloseEventListeners() {
    document.body.removeEventListener("keyup", this._handleEscClose);
    this.popup.removeEventListener("mousedown", this._handleClickOverlayClose);
  }

  // Добавляем обработчики закрытия попапа
  _setCloseEventListeners() {
    document.body.addEventListener("keyup", this._handleEscClose);
    this.popup.addEventListener("mousedown", this._handleClickOverlayClose);
  }

  setEventListeners() {
    this.popup.querySelector(".popup__btn-close").addEventListener("click", this.close);
  }
}
