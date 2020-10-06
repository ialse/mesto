export default class Api {
    constructor(options) {
     this._url = options.url;
     this._headers = options.headers;   
    }

    getInitialCards() {
        // ...
      }
    
      // другие методы работы с API

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me ', {
            headers: {
                authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
              }
        })
    }
}