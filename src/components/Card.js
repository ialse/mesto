export default class Card {
  constructor(data, userID, { handleClickImage, handleDeleteClick, handleLikeClick }, cardTemplate) {
    this._name = data.name; //Название карточки
    this._link = data.link; //Ссылка на картинку
    this._likesCount = data.likes.length; // Кол-во лайков
    this._likes = data.likes; //Массив лайков, нужен для определения где есть мои лайки
    this._id = data._id; // ИД карточки, нужен при удалении карточки и для лайков
    this._ownerId = data.owner._id; // ИД владельца карточки
    this._cardTemplate = cardTemplate; // Селектор шаблона
    this._userID = userID; // ИД текущего пользователя

    //Обработчики
    this._handleClickImage = handleClickImage;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // Получаем шаблон карточки
  _getTemplate() {
    this._card = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  // Получаем ссылку и название карточки
  getCardInfo() {
    const name = this._name;
    const link = this._link;
    return { name, link };
  }

  // Обработчик события, отвечающий за работу лайка
  _addHandlerLike(like) {
    this._handleLikeClick();    
  }

  // Обработчик события, удаляющий карточку
  _addHandlerBtnRemove() {
    this._handleDeleteClick();
  }

  // Удаление карточки со страницы
  deleteCardToPage() {
    this._card.remove();
    this._card = null;
  }

  // Проверка на лайк владельца  
  haveLikeOwner() {
    return this._likes.some((like) => {
      return like._id === this._userID;
    })
  }

  // Смена состояния лайка
  setStateLike() {
    this._card
        .querySelector(".element__button-like")
        .classList
        .toggle("element__button-like_active");
  }

  // Установка количества лайков на странице
  setCountLikeToPage(likes) {
    this._likes = likes; // Обновляем массив лайков в объекте
    this._card.querySelector(".element__likes-count").textContent = likes.length;
  }

  // Установка слушателей
  _setEventListeners() {
    const like = this._card.querySelector(".element__button-like");
    const image = this._card.querySelector(".element__image");

    like.addEventListener("click", () => {
      this._addHandlerLike(like);
    });
    this._btnRemove.addEventListener("click", () => {
      this._addHandlerBtnRemove();
    });
    image.addEventListener("click", () => {
      this._handleClickImage();
    });
  }

  // Создаем и заполняем карточку
  createCard() {
    this._getTemplate();

    const elementImage = this._card.querySelector(".element__image");
    const elementTitle = this._card.querySelector(".element__title");
    const elementLikes = this._card.querySelector(".element__likes-count");
    this._btnRemove = this._card.querySelector(".element__button-remove");

    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    elementLikes.textContent = this._likesCount;

    // Проверяем, есть ли мой ИД и если есть добавляем значок корзины
    if (this._ownerId === this._userID) {
      this._btnRemove.classList.add("element__button-remove_active")
    }

    // Проверяем, есть ли мой ИД в лайках и если есть, ставим лайк
    if (this.haveLikeOwner() ) {
      this.setStateLike();
    }

    this._setEventListeners();

    return this._card;
  }
}
