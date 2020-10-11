export default class Api {
    constructor({ baseUrl, headers, setUserInfo, setCards,
        setCountLike, doAfterLoad, doAfterDeleteCard }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._setUserInfo = setUserInfo;
        this._setCards = setCards;
        this._setCountLike = setCountLike;
        this._doAfterLoad = doAfterLoad;
        this._doAfterDeleteCard = doAfterDeleteCard;
        this._errorServer = document.querySelector(".error-server");
    }

    // Получение с сервера начальных карточек 
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((cards) => { this._setCards(cards); })
            .catch((err) => { this._setErrorServer(err); });
    }

    // Сохранение на сервере карточки
    saveCardToServer({ name, link }, popupAddCard, addCardValidation) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })

        })
            .then((res) => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((card) => {
                this._setCards(card);
            })
            .catch((err) => { this._setErrorServer(err); })
            .finally(() => {
                this._doAfterLoad(popupAddCard, addCardValidation)
            })
    }

    // Удаление на сервере карточки
    deleteCardToServer(card) {
        return fetch(`${this._baseUrl}/cards/${card._id}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(() => {
                this._doAfterDeleteCard(card);
            })
            .catch((err) => { this._setErrorServer(err); });
    }

    // Лайк++
    likeUpCardToServer(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then((res) => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
                //функция, ставящая лайк на основании того, что получено с сервера
                this._setCountLike(card, data.likes.length);
            })
            .catch((err) => { this._setErrorServer(err); });
    }

    // Лайк--
    likeDownCardToServer(card) {
        return fetch(`${this._baseUrl}/cards/likes/${card._id}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then((res) => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
                //функция, ставящая лайк на основании того, что получено с сервера
                this._setCountLike(card, data.likes.length);
            })
            .catch((err) => { this._setErrorServer(err); });
    }

    // Сохранение на сервере Аватара 
    saveAvatarToServer({ link }, popupEditAvatar, editAvatarValidation) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((userInfo) => { this._setUserInfo(userInfo); })
            .catch((err) => { this._setErrorServer(err); })
            .finally(() => {
                this._doAfterLoad(popupEditAvatar, editAvatarValidation)
            })
    }

    // Получение с сервера информация о пользователе 
    getUserInfoFromServer() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((userInfo) => { this._setUserInfo(userInfo); })
            .catch((err) => { this._setErrorServer(err); });
    }

    // Сохранение на сервере информация о пользователе 
    saveUserInfoToServer({ name, about }, popupEditProfile, editProfileValidation) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((userInfo) => { this._setUserInfo(userInfo); })
            .catch((err) => { this._setErrorServer(err); })
            .finally(() => {
                this._doAfterLoad(popupEditProfile, editProfileValidation);
            })
    }

    _setErrorServer(err) {
        this._errorServer.textContent = "Ошибка при соединение с сервером: " +
            err + ". Попробуйте повторить позже";

        this._errorServer.classList.add('error-server_active');
        setTimeout(() => {
            this._errorServer.classList.remove('error-server_active');
        }, 8000)
    }
}