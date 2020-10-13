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
  setUserInfo({ name, about, avatar, _id }) {
    this.id = _id;
    // Так как при редактировании профиля аватар не ставится, то проверка
    if (avatar) {
      this._profileAvatar.style.backgroundImage = `url("${avatar}")`;
    }

    if (name) {
      this._profileName.textContent = name;
    }

    if (about) {
      this._profileWork.textContent = about;
    }
  }
}
