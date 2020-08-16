/*Для КР: окно редактирования профиля и добавление карточки повторяют друг друга один в один. 
Поэтому чтобы не добавлять еще один popup я использовал тот же с переопределением полей*/

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

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;
    card.querySelector('.element__title').textContent = item.name;

    elements.append(card);
});


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

function popupShow(event) {

    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened', 'popup_edit-profile', 'popup_add-card');
    } else {
        popup.classList.add('popup_opened');

        if (event.currentTarget === btnEdit) {
            formEditProfile();
        } else if (event.currentTarget === btnAdd) {
            formAddCard();
        }
    }
}

/*Функция, отрабатывающая при нажатии кнопки сохранить и либо сохраняющая данные по профилю, либо по добавляемой карточке*/
function popupSave(e) {
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

/*Функция, добавляющая карточку*/
function addCard(name, link) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.element__image').src = link;
    card.querySelector('.element__image').alt = name;
    card.querySelector('.element__title').textContent = name;

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

btnEdit.addEventListener('click', popupShow);
formSave.addEventListener('submit', popupSave);
btnClose.addEventListener('click', popupShow);
btnAdd.addEventListener('click', popupShow);