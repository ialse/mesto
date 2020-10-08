import "./index.css";
import { btnEdit, btnAdd, editProfile, addCard } from "../utils/nodes.js"; //импорт констант с узлами страницы
import { initialCards } from "../utils/initial-cards.js"; //импорт массива с данными начальных карточек
import Card from "../components/Card.js"; //импорт класса, отвечающего за создание карточек
import UserInfo from "../components/UserInfo.js"; //импорт класса, отвечающего за информацию о пользователе
import Section from "../components/Section.js"; //импорт класса, отвечающего за вывод данных на страницу
import PopupWithForm from "../components/PopupWithForm.js"; //импорт класса, отвечающего за попапы с формами
import PopupWithImage from "../components/PopupWithImage.js"; //импорт класса, отвечающего за попапы с изображениями
import PopupWithSubmit from "../components/PopupWithSubmit.js"; //импорт класса, отвечающего за попапы с подтверждением
import FormValidator from "../components/FormValidator.js"; //импорт класса, отвечающего за валидацию форм
import Api from "../components/Api.js"; //импорт класса, отвечающего за API

/*Объект с селекторами формы*/
const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, editProfile);
const addCardValidation = new FormValidator(formSelectors, addCard);

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");

//Создаем объект для взаимодействия с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '4b2550a1-9754-487b-87bb-c51dfc845f43',
    'Content-Type': 'application/json'
  },
  setUserInfo: (info) => {
    userInfo.setUserInfo(info);
  },
  setCards: (cards) => {

    cards.forEach((card) => { addCardToPage(card) })
  }
});

api.getUserInfoFromServer();
api.getInitialCards(); //получаем массив карточек

const popupImage = new PopupWithImage(".popup_image");
const popupDeleteConfirm = new PopupWithSubmit(
  {
    //Обработчик кнопки Да
    handleSubmit: (card) => {
      console.log(card);
      popupDeleteConfirm.close();
      api.deleteCardToServer(card);
    },
  },
  ".popup_confirm-delete"
);

function addCardToPage(dataCard) {
  /*Создаем объект карточки*/
  const card = new Card(
    dataCard,
    {
      // Обработчик клика по картинке карточки
      openImagePopup: () => {
        const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки            
        popupImage.setEventListeners();
        popupImage.open(cardInfo);
      },
      handleDeleteClick: () => {
        popupDeleteConfirm.setEventListeners(card);
        popupDeleteConfirm.open();
      },
    },
    "#card-template"
  );
  const cardNode = card.createCard(); // Вставляем разметку
  cardsList.addItem(cardNode); // Добавляем на страницу
}

/*Создаем объект секции*/
const cardsList = new Section(
  {
    data: [],
    renderer: (item) => {
      addCardToPage(item);
    },
  },
  ".elements"
);

/*Создаем объект для попапа редактирования профиля*/
const popupEditProfile = new PopupWithForm(
  {
    //Обработчик кнопки Сохранить
    handleSubmit: (inputValues) => {
      userInfo.setUserInfo(inputValues); // Вставляем данные на страницу
      api.saveUserInfoToServer(inputValues); // Сохраняем на сервере
      popupEditProfile.close();
      editProfileValidation.resetForm(); // Очищаем поля при сохранении
    },
    //Очищаем поля при закрытии
    resetForm: () => {
      editProfileValidation.resetForm();
    },
  },
  ".popup_edit-profile"
);

/*Создаем объект для попапа добавления карточки*/
const popupAddCard = new PopupWithForm(
  {
    //Обработчик кнопки Создать
    handleSubmit: (inputValues) => {
      addCardToPage(inputValues);
      api.saveCardToServer(inputValues);
      popupAddCard.close();
      addCardValidation.resetForm(); // Очищаем поля при Создании
    },
    // Очищаем поля при закрытии
    resetForm: () => {
      addCardValidation.resetForm();
    },
  },
  ".popup_add-card"
);

/* Отрисовка начальных карточек на страницу*/
//cardsList.renderItems();

/*Добавляем слушатели событий*/
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
btnEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupEditProfile.popup.querySelector(".popup__input_name").value = info.name;
  popupEditProfile.popup.querySelector(".popup__input_work").value = info.work;
  popupEditProfile.open();
});
btnAdd.addEventListener("click", () => { popupAddCard.open() });
