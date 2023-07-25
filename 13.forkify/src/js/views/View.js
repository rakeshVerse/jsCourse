import icons from 'url:../../img/icons.svg'; // icons

/**
 * Parent Class
 */
export default class View {
  _data;

  /**
   * Render the recived Object to DOM
   * @param {Object | Object[]} data The data to be rendered (ex. recipe, bookmark, etc)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Rakesh R.
   * @todo Finished Implementaion
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clearParentElement();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Empty the parent element
   * @returns {undefined }
   * @this {Object} View instance
   */
  _clearParentElement() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render spinner to DOM
   * @returns {undefined }
   * @this {Object} View instance
   */
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

  /**
   * Render received error message to DOM
   * @param {string} messsage Error message to be rendered
   * @returns {undefined}
   *
   */
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

  /**
   * Render success message to DOM
   * @param {string} message Success message to be rendered
   * @returns {undefined}
   */
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
