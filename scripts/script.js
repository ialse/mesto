/*Создаем переменную с секцией карточек*/
const elements = document.querySelector('.elements');

/* Переменная с шаблоном карточки*/
const cardTemplate = document.querySelector('#card-template').content;

/* Кнопки */
const btnEdit = document.querySelector('.profile__button-edit');
const btnsClose = document.querySelectorAll('.popup__btn-close');
const btnAdd = document.querySelector('.profile__button-add');

/* Поля на странице*/
const profileName = document.querySelector('.profile__title');
const profileWork = document.querySelector('.profile__subtitle');

/* Всплывающие окна, их поля и кнопки */
const popupEditProfile = document.querySelector('.popup_edit-profile');
const inputName = popupEditProfile.querySelector('.popup__input_name');
const inputWork = popupEditProfile.querySelector('.popup__input_work');
const formSaveEditProfile = popupEditProfile.querySelector('.popup__form');
const btnCloseEditProfile = popupEditProfile.querySelector('.popup__btn-close');

const popupAddCard = document.querySelector('.popup_add-card');
const inputPlace = popupAddCard.querySelector('.popup__input_place');
const inputLink = popupAddCard.querySelector('.popup__input_link');
const formSaveAddCard = popupAddCard.querySelector('.popup__form');
const btnCloseAddCard = popupAddCard.querySelector('.popup__btn-close');

const popupImage = document.querySelector('.popup_image');
const elementImage = popupImage.querySelector('.popup__image');
const elementTitle = popupImage.querySelector('.popup__title');
const btnCloseImage = popupImage.querySelector('.popup__btn-close');

/*Создаем карточку*/
function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    const elementTitle = card.querySelector('.element__title')

    elementImage.src = link;
    elementImage.alt = name;
    elementTitle.textContent = name;

    addHandlerCard(card); /*Навешиваем обработчики*/

    return card;
}

/*Функция, навешивающая обработчики на карточки*/
function addHandlerCard(card) {
    /*каждой кнопке навешиваем обработчик события, отвечающий за работу лайка*/
    card.querySelector('.element__button-like').addEventListener('click', event => {
        event.currentTarget.classList.toggle('element__button-like_active');
    });

    /*каждой картинке навешиваем обработчик события: клик по картинке - открывается попап с картинкой*/
    card.querySelector('.element__image').addEventListener('click', openImagePopup);

    /*каждой кнопке удаления навешиваем обработчик события, удаляющий карточку*/
    card.querySelector('.element__button-remove').addEventListener('click', event => {
        event.currentTarget.closest('.element').remove();
    });
}

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    const card = createCard(name, link); /*Создаем карточку*/
    elements.prepend(card); /*Добавляем сформированную карточку в начало страницы*/
}

/*Открываем попап*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

/*Функция, закрывающая попап по Escape или при клике по оверлею*/
function closeEscapeAndClickOverlay(evt) {
    const popupActive = document.querySelector('.popup_opened');

    if (evt.key === 'Escape' || evt.target === popupActive) {
        closePopup(popupActive);
    }
}

/*Навешиваем обработчики для закрытия попапа по Escape и по клику по оверлею*/
function addHandlerPopup(popup) {
    document.body.addEventListener('keyup', closeEscapeAndClickOverlay);
    popup.addEventListener('click', closeEscapeAndClickOverlay);
}

/*Удаляем обработчики*/
function removeHandlerPopup(popup) {
    document.body.removeEventListener('keyup', closeEscapeAndClickOverlay);
    popup.removeEventListener('click', closeEscapeAndClickOverlay);
}

/*Настраиваем попап EditProfile*/
function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputWork.value = profileWork.textContent;

    addHandlerPopup(popupEditProfile);
    openPopup(popupEditProfile);
}

/*Настраиваем попап AddCard*/
function openAddCardPopup() {
    popupAddCard.firstElementChild.reset(); //очищаю поля, так как окно просто скрывается

    addHandlerPopup(popupAddCard);
    openPopup(popupAddCard);
}

/*Настраиваем попап Image*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.nextElementSibling.textContent;

    elementImage.src = image
    elementImage.alt = title;
    elementTitle.textContent = title;

    addHandlerPopup(popupImage);
    openPopup(popupImage);
}

/*Очищаем тексты ошибок на тот случай, когда попап закрывается с текстом ошибок,
чтобы при его открытии не было видно ошибок, хотя форма может быть заполнена правильно.
По рекомендациям наставника enableValidation() должна вызываться только один раз, поэтому 
делаю отдельную функцию*/
function clearErrorPopup(popup) {
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        hideInputError({
                inputErrorClass: 'popup__input_type_error',
                errorClass: 'popup__error_visible'
            },
            popup, inputElement);
    });
}

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    removeHandlerPopup(popup);
    clearErrorPopup(popup);
}

/*Функция, отрабатывающая при нажатии кнопки сохранить в попапе с редактированием профиля*/
function saveEditProfilePopup(e) {
    e.preventDefault();

    profileName.textContent = inputName.value;
    profileWork.textContent = inputWork.value;
    closePopup(popupEditProfile);
}

/*Функция, отрабатывающая при нажатии кнопки создать в попапе с добавлением карточки*/
function saveAddCardPopup(e) {
    e.preventDefault();

    const name = inputPlace.value;
    const link = inputLink.value;
    addCard(name, link);
    closePopup(popupAddCard);
}

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

/*Навешиваем обработчики*/
btnEdit.addEventListener('click', openEditProfilePopup);
btnAdd.addEventListener('click', openAddCardPopup);

btnCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
btnCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));
btnCloseImage.addEventListener('click', () => closePopup(popupImage));

formSaveEditProfile.addEventListener('submit', saveEditProfilePopup);
formSaveAddCard.addEventListener('submit', saveAddCardPopup);