export default class Api {
    constructor({ baseUrl, headers, setUserInfo }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        this._setUserInfo = setUserInfo;
    }

    getInitialCards() {
        // ...
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
}