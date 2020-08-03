let btnEdit = document.querySelector('.profile__button-edit');
let btnSave = document.querySelector('.popup__btn-save');
let btnClose = document.querySelector('.popup__btn-close');

btnEdit.addEventListener('click', function() {
    document.querySelector('.popup').classList.add('popup_opened');
    document.querySelector('.popup__inp-name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__inp-work').value = document.querySelector('.profile__subtitle').textContent;
});

btnSave.addEventListener('click', function() {
    document.querySelector('.profile__title').textContent = document.querySelector('.popup__inp-name').value;
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.popup__inp-work').value;
    document.querySelector('.popup').classList.remove('popup_opened');
});

btnClose.addEventListener('click', function() {
    document.querySelector('.popup').classList.remove('popup_opened');
});