import "./index.css";
import { btnEditAvatar, btnEdit, btnAdd, editProfile, editAvatar, addCard } from "../utils/nodes.js"; //импорт констант с узлами страницы
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
const editAvatarValidation = new FormValidator(formSelectors, editAvatar);
const editProfileValidation = new FormValidator(formSelectors, editProfile);
const addCardValidation = new FormValidator(formSelectors, addCard);


/*включаем валидацию*/
editAvatarValidation.enableValidation();
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
    //Т.к. при создании карточки в ответ приходит объект,
    //то делаем проверку, чтобы не падало на forEach
    if (Array.isArray(cards)) {
      cards.forEach((card) => { addCardToPage(card) });
    } else {
      addCardToPage(cards);
    }
  },
  setCountLike: (card, likeCount) => {
    card.setCountLikeToPage(likeCount);
  }
});

api.getUserInfoFromServer();
api.getInitialCards(); //получаем массив карточек

const popupImage = new PopupWithImage(".popup_image");

/*Создаем объект для попапа Подтверждения*/
const popupDeleteConfirm = new PopupWithSubmit(
  {
    //Обработчик кнопки Да
    handleSubmit: (card) => {
      popupDeleteConfirm.close();
      api.deleteCardToServer(card);
      card.deleteCardToPage();
    },
  },
  ".popup_confirm-delete"
);

/*функция добавления карточки на страницу*/
function addCardToPage(dataCard) {
  /*Создаем объект карточки*/
  const card = new Card(
    dataCard,
    {
      // Обработчик клика по картинке карточки
      handleClickImage: () => {
        const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки            
        popupImage.setEventListeners();
        popupImage.open(cardInfo);
      },
      // Обработчик клика по кнопке удаления карточки
      handleDeleteClick: () => {
        popupDeleteConfirm.setEventListeners(card);
        popupDeleteConfirm.open();
      },
      // Обработчик клика по лайку карточки
      handleLikeClick: () => {
        //Если стоит лайк, то минусуем, иначе плюсуем
        if (card.getStateLike()) {
          api.likeDownCardToServer(card);
        } else {
          api.likeUpCardToServer(card);
        }
      }
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
    renderer: () => { },
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

/*Создаем объект для попапа редактирования Аватара*/
const popupEditAvatar = new PopupWithForm({
  handleSubmit: (inputValues) => {
    popupEditAvatar.loadStart();
    api.saveAvatarToServer(inputValues, popupEditAvatar);
    popupEditAvatar.close();
    editAvatarValidation.resetForm(); // Очищаем поля при Создании
  },
  // Очищаем поля при закрытии
  resetForm: () => {
    addCardValidation.resetForm();
  },
},
  ".popup_edit-avatar"
);

/*Создаем объект для попапа добавления карточки*/
const popupAddCard = new PopupWithForm(
  {
    //Обработчик кнопки Создать
    handleSubmit: (inputValues) => {
      popupAddCard.loadStart();
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

/*Добавляем слушатели событий*/
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

btnEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupEditProfile.popup.querySelector(".popup__input_name").value = info.name;
  popupEditProfile.popup.querySelector(".popup__input_work").value = info.work;
  popupEditProfile.open();
});
btnAdd.addEventListener("click", () => { popupAddCard.open() });
btnEditAvatar.addEventListener("click", () => { popupEditAvatar.open() });
