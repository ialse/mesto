import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({getInfo, handleSubmit}, popupSelector,  ) {
        super(popupSelector);
        this._getInfo = getInfo;
        this._handleSubmit = handleSubmit;
    }

    _setInfo = ({_name, _work}) => {
        this._inputName = this._popup.querySelector('.popup__input_name');
        this._inputWork = this._popup.querySelector('.popup__input_work');
        this._inputName.value = _name;
        this._inputWork.value = _work;
    }

    _getInputValues = () => {

        this._inputList = this._popup.querySelectorAll('.popup__input');

        this._popupValues = {};
        this._inputList.forEach(input => this._popupValues[input.name] = input.value);

        return this._popupValues;
    }

    /*Чтобы открылся этот метод и не было ошибки при вызове super,
     надо написать стрелочную функцию (надо разобраться почему*/
    open = () => {        
        super.open();
        const info = this._getInfo(); //получаем данные со страницы через объект UserInfo
        this._setInfo(info); //заполняем поля в попапе 
        
    }

    close () {
        super.close();
        /*reset*/
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._handleSubmit);
    }
}