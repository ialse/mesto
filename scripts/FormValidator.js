export default class FormValidator {

    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    /*Показать текст ошибки*/
    _showInputError (parameters, popupElement, inputElement, errorMessage) {
        const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(parameters.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(parameters.errorClass);
    }

    /*Скрыть текст ошибки*/
    _hideInputError (parameters, popupElement, inputElement) {
        const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(parameters.inputErrorClass);
        errorElement.classList.remove(parameters.errorClass);
        errorElement.textContent = '';
    }

    /*Проверка на ошибки*/
    _checkInputValidity (parameters, popupElement, inputElement) {
        if (!inputElement.validity.valid) {
            showInputError(parameters, popupElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(parameters, popupElement, inputElement);
        }
    };

    /*Установка обработчиков на все поля форм*/
    _setEventListeners = (parameters, popupElement) => {
        const inputList = Array.from(popupElement.querySelectorAll(parameters.inputSelector));
        const buttonElement = popupElement.querySelector(parameters.submitButtonSelector);
        toggleButtonState(parameters, inputList, buttonElement);

        inputList.forEach((inputElement) => {

            inputElement.addEventListener('input', function() {

                checkInputValidity(parameters, popupElement, inputElement);
                toggleButtonState(parameters, inputList, buttonElement);
            });
        });
    };

    /*Включение проверки для нужных форм*/
    enableValidation = (parameters) => {
        const formList = Array.from(document.querySelectorAll(parameters.formSelector));
        formList.forEach((popupElement) => {
            popupElement.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });

            setEventListeners(parameters, popupElement);
        });
    };

    /*Проверка на валидность всех полей формы*/
    _hasInvalidInput(inputList) {

        return inputList.some(function(input) {
            return !input.validity.valid;
        })
    }

    /*Блокировка и разблокировка кнопки*/
    _toggleButtonState(parameters, inputList, buttonElement) {

        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(parameters.inactiveButtonClass);
            buttonElement.disabled = true; //Чтобы кнопка не кликалась
        } else {
            buttonElement.classList.remove(parameters.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

}



/*Выбираем формы и элементы, на которые ставим проверки
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

*/