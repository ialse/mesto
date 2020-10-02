export default class UserInfo {
  constructor(profileName, profileWork) {
    this._profileName = document.querySelector(profileName);
    this._profileWork = document.querySelector(profileWork);
  }

  //получить данные со страницы
  getUserInfo() {
    const name = this._profileName.textContent;
    const work = this._profileWork.textContent;
    return { name, work };
  }

  //установить данные на страницу
  setUserInfo({ name, work }) {
    this._profileName.textContent = name;
    this._profileWork.textContent = work;
  }
}
