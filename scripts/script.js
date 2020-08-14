/*Создаем переменную с секцией карточек*/
const elements = document.querySelector('.elements');



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
        popup.classList.remove('popup_opened');
    } else {
        popup.classList.add('popup_opened');

        if (event.currentTarget === btnEdit) {
            inputName.value = profileName.textContent;
            inputWork.value = profileWork.textContent;
        } else if (event.currentTarget === btnAdd) {

            inputName.value = '';
            inputWork.value = '';
        }
    }
}

function popupSave(e) {
    e.preventDefault();
    profileName.textContent = inputName.value;
    profileWork.textContent = inputWork.value;
    popupShow();
}

function addCard() {
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.element__image').src = './images/phuket.JPG';
    card.querySelector('.element__image').alt = 'name';
    card.querySelector('.element__title').textContent = 'name';

    elements.prepend(card);
}

btnEdit.addEventListener('click', popupShow);
formSave.addEventListener('submit', popupSave);
btnClose.addEventListener('click', popupShow);
btnAdd.addEventListener('click', popupShow);