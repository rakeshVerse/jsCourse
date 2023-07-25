import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // icons

/**
 * Represents the view responsible for displaying a list of bookmarks.
 */
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _error = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;

  /**
   * Generates the markup for displaying the list of bookmarks
   * @returns {string} Markup for displaying the list of bookmarks
   */
  _generateMarkup() {
    return this._data
      .map(bookmarks => previewView.render(bookmarks, false))
      .join('');
  }

  /**
   * Adds an event handler to persist bookmarks when the window loads.
   * @param {Function} handler The callback function in the Controller component to be executed when the window loads.
   */
  addHandlerPersistBookmarks(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
