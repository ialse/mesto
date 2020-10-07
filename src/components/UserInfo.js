export default class UserInfo {
  constructor(profileName, profileWork, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileWork = document.querySelector(profileWork);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  //получить данные со страницы
  getUserInfo() {
    const name = this._profileName.textContent;
    const work = this._profileWork.textContent;
    return { name, work };
  }

  //установить данные на страницу
  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileWork.textContent = about;
    // Так как при редактировании профиля аватар не ставится, то проверка
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
  }
}
