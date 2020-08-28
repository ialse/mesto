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

/*Функция, создающая карточку*/
function createCard(name, link) {
    const card = cardTemplate.cloneNode(true);
    const elementImage = card.querySelector('.element__image');
    const elementTitle = card.querySelector('.element__title')

    elementImage.src = link;
    elementImage.alt = name;
    elementTitle.textContent = name;

    /*Навешиваем обработчики*/
    addHandlerCard(card);

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
    /*Создаем карточку*/
    const card = createCard(name, link);

    /*Добавляем сформированную карточку в начало страницы*/
    elements.prepend(card);
}

/*Открываем попап*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    
}

/*Функция, закрывающая попап по Escape*/
function closeEscape (evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}

/*Функция, закрывающая попап при клике по оверлею*/
function closePopupClickOverlay (evt, popup) {
    /*Если клик по области попапа (а не внутреннему контейнеру), то закрываем*/
    if(evt.target === popup) {
        closePopup(popup);
    }
}

/*Настраиваем попап EditProfile*/
function openEditProfilePopup() {
    inputName.value = profileName.textContent;
    inputWork.value = profileWork.textContent;

    //скрываем текст ошибок при закрытии попапа
    /*checkInputValidity(formSaveEditProfile, inputName); 
    checkInputValidity(formSaveEditProfile, inputWork);*/

    //навешиваем обработчик для закрытия попапа по Escape
    document.body.addEventListener('keydown', (evt) => { closeEscape(evt, popupEditProfile) });
    //навешиваем обработчик для закрытия попапа при клике по оверлею
    popupEditProfile.addEventListener('click', (evt) => { closePopupClickOverlay(evt, popupEditProfile) });   
    
    openPopup(popupEditProfile);
}

/*Настраиваем попап AddCard*/
function openAddCardPopup() {
    inputPlace.value = ''; //очищаю поля, так как окно просто скрывается
    inputLink.value = '';

    //скрываем текст ошибок
    /*checkInputValidity(formSaveAddCard, inputPlace); 
    checkInputValidity(formSaveAddCard, inputLink);*/

    //навешиваем обработчик для закрытия попапа по Escape
    document.body.addEventListener('keydown', (evt) => { closeEscape(evt, popupAddCard) });
    //навешиваем обработчик для закрытия попапа при клике по оверлею
    popupAddCard.addEventListener('click', (evt) => { closePopupClickOverlay(evt, popupAddCard) });  

    openPopup(popupAddCard);
}

/*Настраиваем попап Image*/
function openImagePopup(e) {
    const image = e.target.src;
    const title = e.target.nextElementSibling.textContent;

    elementImage.src = image
    elementImage.alt = title;
    elementTitle.textContent = title;

    //навешиваем обработчик для закрытия попапа по Escape
    document.body.addEventListener('keydown', (evt) => { closeEscape(evt, popupImage) });
    //навешиваем обработчик для закрытия попапа при клике по оверлею
    popupImage.addEventListener('click', (evt) => { closePopupClickOverlay(evt, popupImage) });

    openPopup(popupImage);
}

/*Функция, закрывающая попап */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
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