/*Создаем переменную с секцией карточек*/
const elements = document.querySelector('.elements');


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
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.element__image').src = item.link;
    card.querySelector('.element__image').alt = item.name;
    card.querySelector('.element__title').textContent = item.name;

    elements.append(card);
});

/* Кнопки */
let btnEdit = document.querySelector('.profile__button-edit');
let formSave = document.querySelector('.popup__container');
let btnClose = document.querySelector('.popup__btn-close');

/* Поля */
let profileName = document.querySelector('.profile__title');
let profileWork = document.querySelector('.profile__subtitle');

let inputName = document.querySelector('.popup__input_name');
let inputWork = document.querySelector('.popup__input_work');

/* Всплывающее окно */
let popup = document.querySelector('.popup');

let popupShow = function() {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    } else {
        popup.classList.add('popup_opened');
        inputName.value = profileName.textContent;
        inputWork.value = profileWork.textContent;
    }
};

let popupSave = function(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileWork.textContent = inputWork.value;
    popupShow();
};

btnEdit.addEventListener('click', popupShow);
formSave.addEventListener('submit', popupSave);
btnClose.addEventListener('click', popupShow);