export default class Api {
    constructor({ baseUrl, headers, setUserInfo, setCards }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._setUserInfo = setUserInfo;
        this._setCards = setCards;

    }

    getInitialCards() {
        fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((cards) => { this._setCards(cards); })
            .catch((err) => { console.log(err); });
    }

    // Получение с сервера информация о пользователе 
    getUserInfoFromServer() {
        fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => {
                if (res.ok) { return res.json(); }
                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((userInfo) => { this._setUserInfo(userInfo); })
            .catch((err) => { console.log(err); });
    }

    // Сохранение на сервере информация о пользователе 
    setUserInfoToServer({ name, about }) {
        fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
    }
}