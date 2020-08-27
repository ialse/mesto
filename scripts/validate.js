/*Показать текст ошибки*/
const showInputError = (popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    console.log(errorElement);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
  };
  
  /*Скрыть текст ошибки*/
  const hideInputError = (popupElement, inputElement) => {
    console.log(inputElement);
    const errorElement = popupElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
  };
  
  /*Проверка на ошибки*/
  const checkInputValidity = (popupElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(popupElement, inputElement, inputElement.validationMessage);      
    } else {
      hideInputError(popupElement, inputElement);
    }
  };
  
  /*Установка обработчиков на все поля форм*/
  const setEventListeners = (popupElement) => {
    const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
    const buttonElement = popupElement.querySelector('.popup__btn-save');
    toggleButtonState(inputList, buttonElement);
   
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', function () {
        
        checkInputValidity(popupElement, inputElement);        
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  /*Включение проверки для нужных форм*/
  const enableValidation = (formsValidation) => {
    const formList = Array.from(document.querySelectorAll(formsValidation.formSelector));
    formList.forEach((popupElement) => {
      popupElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
    setEventListeners(popupElement);      
    });
  };
  
  /*Выбираем формы и элементы, на которые ставим проверки*/
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  

  /*Проверка на валидность всех полей формы*/
  function hasInvalidInput(inputList) {
    
    return inputList.some(function(input) {
      return !input.validity.valid;
    })
  }
  
  /*Блокировка и разблокировка кнопки*/
  function toggleButtonState (inputList, buttonElement) {
 
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__btn-save_disabled');
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove('popup__btn-save_disabled');
        buttonElement.removeAttribute('disabled', 'disabled');
    }
  }