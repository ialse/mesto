import * as nodes from '../utils/nodes.js'; //импорт констант с узлами страницы
import { initialCards } from '../utils/initial-cards.js'; //импорт массива с данными начальных карточек
import Card from '../components/Card.js'; //импорт класса, отвечающего за создание карточек
import Section from '../components/Section.js'; //импорт класса, отвечающего за вывод данных на страницу
import PopupWithForm from '../components/PopupWithForm.js'; //импорт класса, отвечающего за попапы с формами
import FormValidator from '../components/FormValidator.js'; //импорт класса, отвечающего за валидацию форм

/*Объект с селекторами формы*/
const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

/*Создаем объекты для валидации*/
const editProfileValidation = new FormValidator(formSelectors, nodes.popupEditProfile);
const addCardValidation = new FormValidator(formSelectors, nodes.popupAddCard);

/*включаем валидацию*/
editProfileValidation.enableValidation();
addCardValidation.enableValidation();

/*Создаем объект*/
const cardsList = new Section({
        data: initialCards,
        renderer: (item) => {


            const card = new Card(initialCards[0], '#card-template', saveEditProfilePopup); /*Создаем объект карточки*/
            const cardNode = card.createCard(); /*Вставляем разметку*/

            cardsList.addItem(cardNode);
        },
    },
    nodes.elements
);

/* Отрисовка карточек на страницу*/
cardsList.renderItems();

/*Создаем объект*/
const popupEditProfile = new PopupWithForm('.popup_edit-profile');
popupEditProfile.setEventListeners(); //устанавливаем обработчики




/*Функция, отрабатывающая при нажатии кнопки сохранить в попапе с редактированием профиля*/
function saveEditProfilePopup(e) {
    e.preventDefault();

    nodes.profileName.textContent = nodes.inputName.value;
    nodes.profileWork.textContent = nodes.inputWork.value;
    /*closePopup(nodes.popupEditProfile);*/
}

/*Функция, отрабатывающая при нажатии кнопки создать в попапе с добавлением карточки
function saveAddCardPopup(e) {
    e.preventDefault();

    const data = {
        name: nodes.inputPlace.value,
        link: nodes.inputLink.value
    }

    addCard(data);
    closePopup(nodes.popupAddCard);
}


/*Навешиваем обработчики*/
nodes.btnEdit.addEventListener('click', popupEditProfile.open);
/*nodes.btnAdd.addEventListener('click', openAddCardPopup);*/


/*nodes.btnCloseAddCard.addEventListener('click', () => closePopup(nodes.popupAddCard));
nodes.btnCloseImage.addEventListener('click', () => closePopup(nodes.popupImage));

nodes.formSaveEditProfile.addEventListener('submit', saveEditProfilePopup);
nodes.formSaveAddCard.addEventListener('submit', saveAddCardPopup);*/