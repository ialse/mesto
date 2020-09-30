import { btnEdit, btnAdd, editProfile, addCard } from "../utils/nodes.js"; //импорт констант с узлами страницы
import { initialCards } from "../utils/initial-cards.js"; //импорт массива с данными начальных карточек
import Card from "../components/Card.js"; //импорт класса, отвечающего за создание карточек
import UserInfo from "../components/UserInfo.js"; //импорт класса, отвечающего за информацию о пользователе
import Section from "../components/Section.js"; //импорт класса, отвечающего за вывод данных на страницу
import PopupWithForm from "../components/PopupWithForm.js"; //импорт класса, отвечающего за попапы с формами
import PopupWithImage from "../components/PopupWithImage.js"; //импорт класса, отвечающего за попапы с изображениями
import FormValidator from "../components/FormValidator.js"; //импорт класса, отвечающего за валидацию форм

/*Объект с селекторами формы*/
const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, editProfile);
const addCardValidation = new FormValidator(formSelectors, addCard);

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

const userInfo = new UserInfo();

/*Создаем объект секции*/
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      /*Создаем объект карточки*/
      const card = new Card(
        item,
        {
          openImagePopup: () => {
            const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки
            const popupImage = new PopupWithImage(cardInfo, ".popup_image");
            popupImage.setEventListeners();
            popupImage.open();
          },
        },
        "#card-template"
      );
      const cardNode = card.createCard(); // Вставляем разметку
      cardsList.addItem(cardNode); // Добавляем на страницу
    },
  },
  ".elements"
);

/* Отрисовка карточек на страницу*/
cardsList.renderItems();

/*Создаем объект для попапа редактирования профиля*/
const popupEditProfile = new PopupWithForm(
  {
    //Получаем инфу со страницы через объект UserInfo
    getInfo: () => {
      const info = userInfo.getUserInfo();
      return info;
    },
    //Обработчик кнопки Сохранить
    handleSubmit: () => {
      const inputValues = popupEditProfile._getInputValues(); // Получаем данные из попапа
      userInfo.setUserInfo(inputValues); // Вставляем данные на страницу
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
    getInfo: () => {},
    //Обработчик кнопки Создать
    handleSubmit: () => {
      const inputValues = popupAddCard._getInputValues();
      const cardsList = new Section(
        {
          data: [inputValues],
          renderer: (item) => {
            /*Создаем объект карточки*/
            const card = new Card(
              item,
              {
                openImagePopup: () => {
                  // Обработчик клика по картинке - открытие попапа
                  const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки
                  const popupImage = new PopupWithImage(
                    cardInfo,
                    ".popup_image"
                  );
                  popupImage.setEventListeners();
                  popupImage.open();
                },
              },
              "#card-template"
            );
            const cardNode = card.createCard(); // Вставляем разметку
            cardsList.addItem(cardNode); // Вставляем на страницу
          },
        },
        ".elements"
      );
      cardsList.renderItems();
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
btnEdit.addEventListener(
  "click",
  popupEditProfile.openEditProfile.bind(popupEditProfile)
);
btnAdd.addEventListener("click", popupAddCard.open.bind(popupAddCard));
