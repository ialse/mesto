export default class Card {
  constructor(data, { openImagePopup, handleDeleteClick, handleLikeClick }, cardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likes = (data.likes) ? data.likes.length : 0; //когда создаем карточку надо ставить 0 иначе ошибка
    this._id = (data._id) ? data._id : '';
    this._ownerId = (data.owner) ? data.owner._id : '49625d136d51856d79886d0e';

    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
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
    this._handleLikeClick(this);   //??????? правильно ли?
    like.classList.toggle("element__button-like_active");    
  }

  // Обработчик события, удаляющий карточку
  _addHandlerBtnRemove() {
    //this._card.remove();
    //this._card = null;
    this._handleDeleteClick();
  }

  deleteCardToPage() {
    this._card.remove();
    this._card = null;
  }

  getStateLike() {
    const like = this._card.querySelector(".element__button-like_active");
    if(like) {
      return true;
    } else {
      return false;
    }
  }

  setCountLikeToPage(count) {
    this._card.querySelector(".element__likes-count").textContent = count;    
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
      this._openImagePopup();
    });
  }

  // Создаем карточку
  createCard() {
    this._getTemplate();

    const elementImage = this._card.querySelector(".element__image");
    const elementTitle = this._card.querySelector(".element__title");
    const elementLikes = this._card.querySelector(".element__likes-count");
    this._btnRemove = this._card.querySelector(".element__button-remove");


    elementImage.src = this._link;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;
    elementLikes.textContent = this._likes;

    if(this._ownerId === '49625d136d51856d79886d0e') {
      this._btnRemove.classList.add("element__button-remove_active")
    }
      
    this._setEventListeners();

    return this._card;
  }
}
