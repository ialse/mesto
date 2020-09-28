import { profileName, profileWork } from '../utils/nodes.js'; //импорт констант с узлами страницы

export default class UserInfo {
    constructor({name, work}) {
        this._name = name;
        this._work = work;
    }

    //получить данные со страницы
    getUserInfo () {
        this._name = profileName.textContent;
        this._work = profileWork.textContent;
        return this;
    }

    //установить данные на страницу
    setUserInfo () {
        profileName.textContent = this._name;
        profileWork.textContent = this._work;
    }
}