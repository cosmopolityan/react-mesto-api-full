export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверка ответа от сервера:
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
  //

  getInitialData() {
    return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  postItem(newItem) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newItem.name,
        link: newItem.link
      })
    })
      .then(this._checkResponse)
  }

  deleteItem(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserInfo(newInfo) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.name,
        about: newInfo.about
      })
    })
      .then(this._checkResponse)
  }

  setUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar.avatar,
      })
    })
      .then(this._checkResponse)
  }

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}

// 39
const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort39',
  // это верный адрес:
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '8a68b5b5-74ef-4efd-83eb-2f78a5762b34',
    'Content-Type': 'application/json'
  }
});

// 36
// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
//   headers: {
//     authorization: 'c848aad0-462d-42a9-8fc3-c67e20450e85',
//     'Content-Type': 'application/json'
//   }
// });

export { api }