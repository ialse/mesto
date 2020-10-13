/*Для КР: Благодарю за ценные замечания. Помогли сделать код гораздо более логичным и не хаотичным,
 а также лучше понять взаимодействие между классамим*/
import "./index.css";
import { btnEditAvatar, btnEditProfile, btnAdd, editProfile, editAvatar, addCard, errorServer } from "../utils/nodes.js"; //импорт констант с узлами страницы
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

// Создаем объекты для валидации
const editAvatarValidation = new FormValidator(formSelectors, editAvatar);
const editProfileValidation = new FormValidator(formSelectors, editProfile);
const addCardValidation = new FormValidator(formSelectors, addCard);


// Включаем валидацию
editAvatarValidation.enableValidation();
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

// Создаем объект для взаимодействия с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '4b2550a1-9754-487b-87bb-c51dfc845f43',
    'Content-Type': 'application/json'
  },
});

function setErrorServer(err) {
  errorServer.textContent = `Ошибка при соединение с сервером: ${err}. Попробуйте повторить позже`;

  errorServer.classList.add('error-server_active');
  setTimeout(() => {
    errorServer.classList.remove('error-server_active');
  }, 8000)
}

// Создаем объект секции
const cardsList = new Section({
  renderer: (card) => {
    addCardToPage(card);
  }
},
  ".elements"
);

// Создаем объект профиля
const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");

// Получаем данные профиля и устанавливаем на страницу
api.getUserInfoFromServer()
  .then((info) => { userInfo.setUserInfo(info); })
  .catch((err) => { setErrorServer(err) });

// Получаем массив карточек и устанавливаем на страницу
api.getInitialCards()
  .then((cards) => { cardsList.renderItems(cards); })
  .catch((err) => { setErrorServer(err); });

const popupImage = new PopupWithImage(".popup_image");

// Создаем объект для попапа Подтверждения
const popupDeleteConfirm = new PopupWithSubmit(
  {
    //Обработчик кнопки Да
    handleSubmit: (card) => {
      popupDeleteConfirm.close();
      api.deleteCardToServer(card)
        .then(() => { card.deleteCardToPage(); })
        .catch((err) => { setErrorServer(err); });
    },
  },
  ".popup_confirm-delete"
);

// Добавление карточки на страницу
function addCardToPage(dataCard) {
  // Создаем объект карточки
  const card = new Card(
    dataCard,
    userInfo.id,
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
        // Если владелец лайка я, то делаем его активным
        if (card.haveLikeOwner()) {
          api.likeDownCardToServer(card)
            .then((data) => {
              // Ставим лайк и количество на основании того, что получено с сервера
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => { setErrorServer(err); });
        } else {
          api.likeUpCardToServer(card)
            .then((data) => {
              card.setCountLikeToPage(data.likes);
              card.setStateLike();
            })
            .catch((err) => { setErrorServer(err); });
        }
      }
    },
    "#card-template"
  );
  const cardNode = card.createCard(); // Вставляем разметку
  cardsList.addItem(cardNode); // Добавляем на страницу
}


// Создаем объект для попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  {
    //Обработчик кнопки Сохранить
    handleSubmit: (inputValues) => {
      popupEditProfile.loadStart();           // Включаем блок и меняем название кнопки
      api.saveUserInfoToServer(inputValues)   // Сохраняем на сервере
        .then((info) => { userInfo.setUserInfo(info); }) // Устанавливаем данные о пользователе на страницу
        .catch((err) => { setErrorServer(err); })
        .finally(() => {
          popupEditProfile.loadEnd();     //Снимаем блок и меняем название кнопки на начальное
          popupEditProfile.close();
          editProfileValidation.resetForm(); // Очищаем поля при Создании
        });
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
    api.saveAvatarToServer(inputValues)
      .then((info) => { userInfo.setUserInfo(info); }) // Устанавливаем данные о пользователе на страницу
      .catch((err) => { setErrorServer(err); })
      .finally(() => {
        popupEditAvatar.loadEnd();  //Снимаем блок и меняем название кнопки на начальное
        popupEditAvatar.close();
        editAvatarValidation.resetForm(); // Очищаем поля при Создании
      });
  },
  // Очищаем поля при закрытии
  resetForm: () => {
    editAvatarValidation.resetForm();
  },
},
  ".popup_edit-avatar"
);

// Создаем объект для попапа добавления карточки
const popupAddCard = new PopupWithForm(
  {
    // Обработчик кнопки Создать
    handleSubmit: (inputValues) => {
      popupAddCard.loadStart();
      api.saveCardToServer(inputValues)
        .then((card) => {
          addCardToPage(card);
        })
        .catch((err) => { setErrorServer(err); })
        .finally(() => {
          popupAddCard.loadEnd();  //Снимаем блок и меняем название кнопки на начальное
          popupAddCard.close();
          addCardValidation.resetForm(); // Очищаем поля при Создании
        });
    },
    // Очищаем поля при закрытии
    resetForm: () => {
      addCardValidation.resetForm();
    },
  },
  ".popup_add-card"
);

// Добавляем слушатели событий
popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

btnEditAvatar.addEventListener("click", () => { popupEditAvatar.open() });
btnEditProfile.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupEditProfile.popup.querySelector(".popup__input_name").value = info.name;
  popupEditProfile.popup.querySelector(".popup__input_work").value = info.work;
  popupEditProfile.open();
});
btnAdd.addEventListener("click", () => { popupAddCard.open() });
