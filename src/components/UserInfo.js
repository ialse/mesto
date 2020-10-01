import { profileName, profileWork } from "../utils/nodes.js"; //импорт констант с узлами страницы

export default class UserInfo {
  constructor() {}

  //получить данные со страницы
  getUserInfo() {
    this._name = profileName.textContent;
    this._work = profileWork.textContent;
    return this;
  }

  //установить данные на страницу
  setUserInfo({ name, work }) {
    profileName.textContent = name;
    profileWork.textContent = work;
  }
}
