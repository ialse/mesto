export default class FormValidator {

    /*Конструктор*/
    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._form = form;
    }

    /*Показать текст ошибки*/
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    /*Скрыть текст ошибки. Метод публичный, 
    так как использую его для скрытия текста ошибок после закрытия попапа*/
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    /*Проверка на ошибки*/
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    /*Получить массив полей текущей формы*/
    _getInputList = () => {
        return Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    /*Получить кнопку Сохранить текущей формы*/
    _getButtonElement = () => {
        return this._form.querySelector(this._submitButtonSelector);
    }

    /*Установка обработчиков на все поля форм*/
    _setEventListeners = () => {
        const inputList = this._getInputList();
        const buttonElement = this._getButtonElement();
        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    /*Включение проверки для нужной формы*/
    enableValidation = () => {
        this._form.addEventListener('submit', evt => { evt.preventDefault() });
        this._setEventListeners();
    };

    /*Проверка на валидность всех полей формы*/
    _hasInvalidInput(inputList) {
        return inputList.some(input => !input.validity.valid);
    }

    /*Блокировка и разблокировка кнопки*/
    _toggleButtonState(inputList, buttonElement) {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true; //Чтобы кнопка не кликалась
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    /*Очищаем тексты ошибок, поля и блокируем кнопку*/
    resetForm = () => {
        const inputList = this._getInputList();
        const buttonElement = this._getButtonElement();

        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._form.querySelector(this._formSelector).reset();

    }
}