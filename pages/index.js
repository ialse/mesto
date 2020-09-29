import * as nodes from '../utils/nodes.js'; //импорт констант с узлами страницы
import { initialCards } from '../utils/initial-cards.js'; //импорт массива с данными начальных карточек
import Card from '../components/Card.js'; //импорт класса, отвечающего за создание карточек
import UserInfo from '../components/UserInfo.js'; //импорт класса, отвечающего за информацию о пользователе
import Section from '../components/Section.js'; //импорт класса, отвечающего за вывод данных на страницу
import PopupWithForm from '../components/PopupWithForm.js'; //импорт класса, отвечающего за попапы с формами
import PopupWithImage from '../components/PopupWithImage.js'; //импорт класса, отвечающего за попапы с изображениями
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

            /*Создаем объект карточки*/
            const card = new Card(item, { 
                openImagePopup: () => {
                    const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки
                    console.log(cardInfo);
                    const popupImage = new PopupWithImage(cardInfo, '.popup_image');
                    
                    popupImage.setEventListeners();
                    popupImage.openImage.call(popupImage);

                }
            },
            '#card-template'); 
            const cardNode = card.createCard(); // Вставляем разметку
            cardsList.addItem(cardNode); // Добавляем на страницу
        },
    },
    nodes.elements
);

/* Отрисовка карточек на страницу*/
cardsList.renderItems();

/*Создаем объект для редактирования профиля*/
const popupEditProfile = new PopupWithForm({
        //Получаем инфу со страницы через объект UserInfo
        getInfo: () => {

        const userInfo = new UserInfo({name: '', work: ''});
        const info = userInfo.getUserInfo();

        return info;
        },

        //Обработчик кнопки Сохранить
        handleSubmit: () => {
            const inputValues = popupEditProfile._getInputValues();
            const userInfo = new UserInfo(inputValues);
            userInfo.setUserInfo();
            popupEditProfile.close();
        }
    },
    '.popup_edit-profile');

popupEditProfile.setEventListeners(); //устанавливаем обработчики

/*Создаем объект для добавления карточки*/
const popupAddCard = new PopupWithForm({
        getInfo: () => {},
        //Обработчик кнопки Создать
        handleSubmit: () => {
                const inputValues = popupAddCard._getInputValues();
                const cardsList = new Section({
                    data: [inputValues],
                    renderer: (item) => {
                    
                        /*Создаем объект карточки*/
                        const card = new Card(item, { 
                            openImagePopup: () => {
                            
                                const cardInfo = card.getCardInfo(); //получаем название и ссылку карточки
                                const popupImage = new PopupWithImage(cardInfo, '.popup_image');
                                popupImage.setEventListeners();
                                popupImage.open();
                                }
                            },
                            '#card-template'); 
                        const cardNode = card.createCard(); // Вставляем разметку
                        cardsList.addItem(cardNode); // Добавляем на страницу
                    },
                },
                nodes.elements
            );
            cardsList.renderItems();
            popupAddCard.close();
        }
    
    }, '.popup_add-card');
popupAddCard.setEventListeners(); //устанавливаем обработчики


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
nodes.btnAdd.addEventListener('click', popupAddCard.open);


/*nodes.formSaveEditProfile.addEventListener('submit', saveEditProfilePopup);
nodes.formSaveAddCard.addEventListener('submit', saveAddCardPopup);*/