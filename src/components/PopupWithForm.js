import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleSubmit, resetForm }, popupSelector) {
    super(popupSelector);
    this._btnSubmit = this.popup.querySelector('.popup__btn-submit')
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._resetForm = resetForm;
  }

  //Получаем данные из полей попапа
  _getInputValues() {
    this._inputList = this.popup.querySelectorAll(".popup__input");
    this._popupValues = {};
    this._inputList.forEach(
      (input) => (this._popupValues[input.name] = input.value)
    );
    return this._popupValues;
  }

  // UX - подгрузка данных
  loadStart() {
    this._btnSubmit.textContent = this._btnSubmit.textContent + '...';
  }

  loadEnd() {
    this._btnSubmit.textContent = this._btnSubmit.textContent.replace('...', '');
  }

  //Закрываем попап
  close() {
    super.close();
    this._resetForm(); //очищаем поля
  }

  setEventListeners() {
    super.setEventListeners();
    //навешиваем обработчик кнопки Сохранить/Создать
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
