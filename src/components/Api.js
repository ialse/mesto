export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        // ...
    }

    // Получение с сервера информация о пользователе 
    getUserInfo() {
        const info = {};

       /* function test(userInfo) {
            info.name = userInfo.name;
        }*/

        fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`); // если ошибка при запросе, переходим к catch
            })
            .then((userInfo) => {
               // name = userInfo.name;
                //work = userInfo.about;
                //avatar = userInfo.avatar;
                return userInfo;                
            })
            .catch((err) => {
                console.log(err);
            });
        //console.log(info);    
        //return  info;
    }
}