import View from './View.js';
import icons from 'url:../../img/icons.svg'; // icons

/**
 * Represents a view for adding recipes.
 */
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploded :)';

  /**
   * Registers event listeners when AddRecipeView instance is created for showing/hinding popup .
   */
  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerCloseWindow();
  }

  /**
   * Toggles the visibility of the add recipe window and overlay.
   * @private
   */
  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Adds a click event handler to the button that opens the add recipe window.
   * @private
   */
  _addHandlerOpenWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  /**
   * Adds click event handlers to the button that closes the add recipe window
   * and the overlay element to close the window when clicking outside of it.
   * @private
   */
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }

  /**
   * Adds a submit event handler to the parent element for recipe upload.
   * @param {Function} handler The callback function to handle the submitted form data.
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const formDataArr = [...new FormData(this)];
      // const formData = Object.fromEntries(formDataArr);
      handler(formDataArr);
    });
  }
}

export default new AddRecipeView();
