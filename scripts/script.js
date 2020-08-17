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

/* Всплывающие окна */
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

/*Функция, открывающая и закрывающая окно popup*/
function popupEditProfileShow() {

    if (popupEditProfile.classList.contains('popup_opened')) {
        popupEditProfile.classList.remove('popup_opened');
    } else {
        popupEditProfile.classList.add('popup_opened');
    }
}

/*Функция, открывающая и закрывающая окно popup*/
function popupAddCardShow() {

    if (popupAddCard.classList.contains('popup_opened')) {
        popupEditProfileShow(); //Закрываю окно
    } else {
        popupAddCard.classList.add('popup_opened');
    }
}


/*Функция, отрабатывающая при нажатии кнопки сохранить и либо сохраняющая данные по профилю, либо по добавляемой карточке*/
function popupProfileSave(e) {
    e.preventDefault();

    if (popup.classList.contains('popup_edit-profile')) {
        profileName.textContent = inputName.value;
        profileWork.textContent = inputWork.value;
        popupEditProfileShow()
    } else if (popup.classList.contains('popup_add-card')) {
        const name = inputName.value;
        const link = inputWork.value;
        addCard(name, link);
        popupAddCardShow();
    }
}


function popupCardSave() {
    e.preventDefault();
    const name = inputName.value;
    const link = inputWork.value;
    addCard(name, link);
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

/*Функция, которая отрисовывает по шаблону первоначальные карточки */
initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

btnEdit.addEventListener('click', popupEditProfileShow);
btnAdd.addEventListener('click', popupAddCardShow);
btnClose.addEventListener('click', popupEditProfileShow);

formSave.addEventListener('submit', popupProfileSave);