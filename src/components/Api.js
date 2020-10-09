export default class Api {
    constructor({ baseUrl, headers, setUserInfo, setCards }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._setUserInfo = setUserInfo;
        this._setCards = setCards;

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
    }

    // Удаление на сервере карточки
    deleteCardToServer({ _id }) {
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            headers: this._headers,
            method: 'DELETE'
        })
    }

    // Получение с сервера информация о пользователе 
    getUserInfoFromServer() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
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
    }
}