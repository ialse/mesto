export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        // ...
    }

    // другие методы работы с API

    getUserInfo() {
        console.log(this._headers);
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((userInfo) => {
                console.log(userInfo);
                return userInfo;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}