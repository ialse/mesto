/*Создаем переменную с секцией карточек*/
const elements = document.querySelector('.elements');

/*Создаем переменную страницы*/
const page = document.querySelector('.page');

/* Переменная с шаблоном. Используется в нескольких функциях, поэтому глобальная*/
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [{
        name: 'Хонкасало',
        link: './images/honkasalo.JPG'
    },
    {
        name: 'Ладожские шхеры',
        link: './images/ladShheri.JPG'
    },
    {
        name: 'Санкт-Петербург',
        link: './images/peterburg.JPG'
    },
    {
        name: 'Пхукет',
        link: './images/phuket.JPG'
    },
    {
        name: 'Рыбацкое',
        link: './images/ribackoe.JPG'
    },
    {
        name: 'Вуокса',
        link: './images/vuoksa.JPG'
    }
];

/* Кнопки */
const btnEdit = document.querySelector('.profile__button-edit');
const formSave = document.querySelectorAll('.popup__container');
const btnClose = document.querySelectorAll('.popup__btn-close');
const btnAdd = document.querySelector('.profile__button-add');

/* Поля */
const profileName = document.querySelector('.profile__title');
const profileWork = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input_name');
const inputWork = document.querySelector('.popup__input_work');
const inputPlace = document.querySelector('.popup__input_place');
const inputLink = document.querySelector('.popup__input_link');

/* Всплывающие окна */
const popup = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupImage = document.querySelector('.popup_image');


/*Функция, открывающая один из трех попапов в зависимости от кнопки, по которой нажали или закрывающая попап*/
function popupShow(e) {

    if (e.target === btnEdit) {
        popupEditProfile.classList.add('popup_opened');
        inputName.value = profileName.textContent;
        inputWork.value = profileWork.textContent;
    } else if (e.target === btnAdd) {
        popupAddCard.classList.add('popup_opened');
        inputPlace.value = ''; //очищаю поля, так как окно просто скрывается
        inputLink.value = '';
    } else if (e.target.classList.contains('element__image')) {
        const image = e.target.src;
        const title = e.target.nextElementSibling.textContent;
        popupImage.classList.add('popup_opened');
        popupImage.querySelector('.popup__image').src = image
        popupImage.querySelector('.popup__title').textContent = title;
    }
}

/*Функция, закрывающая попап */
function popupClose() {
    popupEditProfile.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
}

/*Функция, отрабатывающая при нажатии кнопки сохранить и либо сохраняющая данные по профилю, либо по добавляемой карточке*/
function popupSave(e) {
    e.preventDefault();

    if (popupEditProfile.classList.contains('popup_opened')) {
        profileName.textContent = inputName.value;
        profileWork.textContent = inputWork.value;

    } else if (popupAddCard.classList.contains('popup_opened')) {
        const name = inputPlace.value;
        const link = inputLink.value;
        addCard(name, link);
    }
    popupClose();
}

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    const card = document.querySelector('#card-template').content.cloneNode(true);

    card.querySelector('.element__image').src = link;
    card.querySelector('.element__image').alt = name;
    card.querySelector('.element__title').textContent = name;

    /*каждой кнопке навешиваем обработчик события, отвечающий за работу лайка*/
    card.querySelector('.element__button-like').addEventListener('click', event => {
        event.currentTarget.classList.toggle('element__button-like_active');
    });
    /*каждой картинке навешиваем обработчик события: клик по картинке - открывается попап с картинкой*/
    card.querySelector('.element__image').addEventListener('click', popupShow);

    /*каждой кнопке удаления навешиваем обработчик события*/
    card.querySelector('.element__button-remove').addEventListener('click', event => {
        event.currentTarget.closest('.element').remove();
    });

    /*Добавляем сформированную карточку в начало страницы*/
    elements.prepend(card);
}

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

btnEdit.addEventListener('click', popupShow);
btnAdd.addEventListener('click', popupShow);
btnClose.forEach((item) => { item.addEventListener('click', popupClose) })

formSave.forEach((item) => { item.addEventListener('submit', popupSave) });