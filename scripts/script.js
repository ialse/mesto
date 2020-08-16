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
const formSave = document.querySelector('.popup__container');
const btnClose = document.querySelector('.popup__btn-close');
const btnAdd = document.querySelector('.profile__button-add');

/* Поля */
const profileName = document.querySelector('.profile__title');
const profileWork = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input_name');
const inputWork = document.querySelector('.popup__input_work');

/* Всплывающее окно */
const popup = document.querySelector('.popup');

function popupShow() {

    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened', 'popup_edit-profile', 'popup_add-card');
    } else {
        popup.classList.add('popup_opened');

    }
}

function addCardShow() {

    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened', 'popup_edit-profile', 'popup_add-card');
    } else {
        popup.classList.add('popup_opened');

    }
}

/*Функция, отрабатывающая при нажатии кнопки сохранить и либо сохраняющая данные по профилю, либо по добавляемой карточке*/
function popupProfileSave(e) {
    e.preventDefault();

    if (popup.classList.contains('popup_edit-profile')) {
        profileName.textContent = inputName.value;
        profileWork.textContent = inputWork.value;
    } else if (popup.classList.contains('popup_add-card')) {
        const name = inputName.value;
        const link = inputWork.value;
        addCard(name, link);
    }

    popupShow();
}

function popupCardSave() {
    e.preventDefault();
    const name = inputName.value;
    const link = inputWork.value;
    addCard(name, link);

    addCardShow();
}

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    console.log(card.querySelector('.element__button-like'));

    card.querySelector('.element__image').src = link;
    card.querySelector('.element__image').alt = name;
    card.querySelector('.element__title').textContent = name;

    /*каждой кнопке навешиваем обработчик события*/
    card.querySelector('.element__button-like').addEventListener('click', event => {
        event.currentTarget.classList.toggle('element__button-like_active');
    });

    /*Добавляем сформированную карточку в начало страницы*/
    elements.prepend(card);
}

/*Функция, формирующая окно редактирования профиля*/
function formEditProfile() {
    popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
    /*Задаю класс с модификатором, чтобы различать окно редактирования профиля от окна добавления карточки:*/
    popup.classList.add('popup_edit-profile');

    inputName.value = profileName.textContent;
    inputWork.value = profileWork.textContent;
}

/*Функция, формирующая окно добавления карточки*/
function formAddCard() {
    popup.querySelector('.popup__title').textContent = 'Новое место';
    popup.querySelector('.popup__input_name').placeholder = 'Название';
    popup.querySelector('.popup__input_work').placeholder = 'Ссылка на картинку';
    /*Задаю класс с модификатором, чтобы различать окно редактирования профиля от окна добавления карточки:*/
    popup.classList.add('popup_add-card');

    inputName.value = '';
    inputWork.value = '';
}

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

btnEdit.addEventListener('click', popupShow);
addCard.addEventListener('click', addCardShow);
formSave.addEventListener('submit', popupSave);
formSave.addEventListener('submit', popupSave);
btnClose.addEventListener('click', popupShow);
btnAdd.addEventListener('click', popupShow);