export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayClose = this._handleClickOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }

  // Обработчик нажатия Escape - закрывает попап
  _handleEscClose(evt) {
      console.log("111");
    const popupActive = document.querySelector(".popup_opened");
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Обработчик клика по оверлею - закрывает попап
  _handleClickOverlayClose(evt) {
    console.log("222");
    const popupActive = document.querySelector(".popup_opened");
    if (evt.target === popupActive) {
      this.close();
    }
  }

  // Открываем попап
  open() {
    this._popup.classList.add("popup_opened");
    this._setCloseEventListeners();
  }

  // Закрываем попап
  close() {
    this._popup.classList.remove("popup_opened");
    this._removeCloseEventListeners();
  }

  // Удаляем обработчики закрытия попапа
  _removeCloseEventListeners() {
    document.body.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._handleClickOverlayClose);
  }

  // Добавляем обработчики закрытия попапа
  _setCloseEventListeners() {
    document.body.addEventListener("keyup", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleClickOverlayClose);    
  }

  setEventListeners() {
    this._popup.querySelector(".popup__btn-close").addEventListener("click", this.close);
  }
}
