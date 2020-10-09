export default class Card {
  constructor(data, { handleClickImage, handleDeleteClick, handleLikeClick }, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likesCount = (data.likes) ? data.likes.length : 0; //когда создаем карточку надо ставить 0 иначе ошибка
    this._likes = data.likes;
    this._id = (data._id) ? data._id : '';
    this._ownerId = (data.owner) ? data.owner._id : '49625d136d51856d79886d0e';

    this._cardTemplate = cardTemplate;
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
    this._handleLikeClick(); // для отправки на сервер
    like.classList.toggle("element__button-like_active");
  }

  // Обработчик события, удаляющий карточку
  _addHandlerBtnRemove() {
    //this._card.remove();
    //this._card = null;
    this._handleDeleteClick();
  }

  // Удаление карточки со страницы
  deleteCardToPage() {
    this._card.remove();
    this._card = null;
  }

  // Получение состояния лайка
  getStateLike() {
    const like = this._card.querySelector(".element__button-like_active");
    return like ? true : false;
  }

  // Установка количества лайков на странице
  setCountLikeToPage(count) {
    this._card.querySelector(".element__likes-count").textContent = count;
  }

  // Проверяем есть ли среди ИД лайков мой и делаем лайк активным, если есть
  _setMyLike() {
    this._likes.forEach((like) => {
      if (like._id === '49625d136d51856d79886d0e') {
        this._card.querySelector(".element__button-like").classList.add('element__button-like_active');
      }
    })
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

    if (this._ownerId === '49625d136d51856d79886d0e') {
      this._btnRemove.classList.add("element__button-remove_active")
    }

    this._setMyLike();
    this._setEventListeners();

    return this._card;
  }
}
