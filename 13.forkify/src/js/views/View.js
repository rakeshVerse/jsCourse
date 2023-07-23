import icons from 'url:../../img/icons.svg'; // icons

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(messsage = this._error) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${messsage}</p>
      </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
