export default class Api {
    constructor({ baseUrl, headers, setUserInfo, setCards, setCard, setCountLike }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._setUserInfo = setUserInfo;
        this._setCards = setCards;
        this._setCountLike = setCountLike;
    }

    // Получение с сервера начальных карточек 
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((cards) => { this._setCards(cards); })
            .catch((err) => { console.log(err); });
    }

    // Сохранение на сервере карточки
    saveCardToServer({ name, link }) {
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
            .then((card) => { this._setCards(card); })
            .catch((err) => { console.log(err); });
    }

    // Удаление на сервере карточки
    deleteCardToServer({ _id }) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .catch((err) => { console.log(err); });
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
            .catch((err) => { console.log(err); });
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
            .catch((err) => { console.log(err); });
    }

    // Сохранение на сервере Аватара 
    saveAvatarToServer({ link }) {
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
            .catch((err) => { console.log(err); });
    }

    // Получение с сервера информация о пользователе 
    getUserInfoFromServer() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((userInfo) => { this._setUserInfo(userInfo); })
            .catch((err) => { console.log(err); });
    }

    // Сохранение на сервере информация о пользователе 
    saveUserInfoToServer({ name, about }) {
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
            .catch((err) => { console.log(err); });
    }
}