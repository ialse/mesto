import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ getInfo, handleSubmit, resetForm }, popupSelector, ) {
        super(popupSelector);
        this._getInfo = getInfo;
        this._handleSubmit = handleSubmit;
        this._resetForm = resetForm;
    }

    //Заполняем поля в попапе данными со страницы
    _setInfo = ({ _name, _work }) => {
        this._inputName = this._popup.querySelector('.popup__input_name');
        this._inputWork = this._popup.querySelector('.popup__input_work');
        this._inputName.value = _name;
        this._inputWork.value = _work;
    }

    //Получаем данные из полей попапа
    _getInputValues() {

        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._popupValues = {};
        this._inputList.forEach(input => this._popupValues[input.name] = input.value);
        return this._popupValues;
    }

    //Открываем попап Редактирования профиля, дополнительно вставлям данные
    openEditProfile() {
        super.open();
        const info = this._getInfo(); //получаем данные со страницы через объект UserInfo
        this._setInfo(info); //заполняем поля в попапе    
    }

    //Закрываем попап
    close() {
        super.close();
        this._resetForm(); //очищаем поля
    }

    setEventListeners() {
        super.setEventListeners(); //навешиваем общие обработчики
        this._popup.addEventListener('submit', this._handleSubmit.bind(this)); //навешиваем обработчик кнопки Сохранить/Создать
    }
}