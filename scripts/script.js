/*Создаем переменную с секцией карточек*/
const elements = document.querySelector('.elements');

/*Создаем переменную страницы*/
const page = document.querySelector('.page');

/* Переменная с шаблоном. Используется в нескольких функциях, поэтому глобальная*/
const cardTemplate = document.querySelector('#card-template').content;

/* Кнопки */
const btnEdit = document.querySelector('.profile__button-edit');
const formsSave = document.querySelectorAll('.popup__container');
const btnsClose = document.querySelectorAll('.popup__btn-close');
const btnAdd = document.querySelector('.profile__button-add');

/* Поля */
const profileName = document.querySelector('.profile__title');
const profileWork = document.querySelector('.profile__subtitle');

/* Всплывающие окна и их поля */
const popupEditProfile = document.querySelector('.popup_edit-profile');
const inputName = popupEditProfile.querySelector('.popup__input_name');
const inputWork = popupEditProfile.querySelector('.popup__input_work');

const popupAddCard = document.querySelector('.popup_add-card');
const inputPlace = popupAddCard.querySelector('.popup__input_place');
const inputLink = popupAddCard.querySelector('.popup__input_link');

const popupImage = document.querySelector('.popup_image');
const elementImage = popupImage.querySelector('.popup__image');
const elementTitle = popupImage.querySelector('.popup__title');


/*Функция, создающая карточку*/
function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    const elementTitle = card.querySelector('.element__title')

    elementImage.src = link;
    elementImage.alt = name;
    elementTitle.textContent = name;

    return card;
}

/*Функция, навешивающая обработчики на карточки*/
function addHandlerCard(card) {
    /*каждой кнопке навешиваем обработчик события, отвечающий за работу лайка*/
    card.querySelector('.element__button-like').addEventListener('click', event => {
        event.currentTarget.classList.toggle('element__button-like_active');
    });
    /*каждой картинке навешиваем обработчик события: клик по картинке - открывается попап с картинкой*/
    card.querySelector('.element__image').addEventListener('click', showPopup);

    /*каждой кнопке удаления навешиваем обработчик события*/
    card.querySelector('.element__button-remove').addEventListener('click', event => {
        event.currentTarget.closest('.element').remove();
    });
}

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    /*Создаем карточку*/
    const card = createCard(name, link);

    /*Навешиваем обработчики*/
    addHandlerCard(card);

    /*Добавляем сформированную карточку в начало страницы*/
    elements.prepend(card);
}

/*Открываем попап*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

/*Настраиваем попап EditProfile*/
function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputWork.value = profileWork.textContent;
    openPopup(popupEditProfile);
}

/*Настраиваем попап AddCard*/
function openAddCardPopup() {
    inputPlace.value = ''; //очищаю поля, так как окно просто скрывается
    inputLink.value = '';
    openPopup(popupAddCard);
}

/*Настраиваем попап Image*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.nextElementSibling.textContent;   

    elementImage.src = image
    elementImage.alt = title;
    elementTitle.textContent = title;
    openPopup(popupImage);
}

/*Функция, открывающая один из трех попапов в зависимости от кнопки, по которой нажали*/
function showPopup(e) {
    if (e.target === btnEdit) {
        openEditProfilePopup();
    } else if (e.target === btnAdd) {
        openAddCardPopup();
    } else if (e.target.classList.contains('element__image')) {
        openImagePopup(e);        
    }
}

/*Функция, закрывающая попап */
function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
}

/*Функция, отрабатывающая при нажатии кнопки сохранить и либо сохраняющая данные по профилю, либо по добавляемой карточке*/
function savePopup(e) {
    e.preventDefault();

    if (popupEditProfile.classList.contains('popup_opened')) {
        profileName.textContent = inputName.value;
        profileWork.textContent = inputWork.value;

    } else if (popupAddCard.classList.contains('popup_opened')) {
        const name = inputPlace.value;
        const link = inputLink.value;
        addCard(name, link);
    }
    closePopup();
}

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

btnEdit.addEventListener('click', showPopup);
btnAdd.addEventListener('click', showPopup);
btnsClose.forEach((item) => { item.addEventListener('click', closePopup) })

formsSave.forEach((item) => { item.addEventListener('submit', savePopup) });