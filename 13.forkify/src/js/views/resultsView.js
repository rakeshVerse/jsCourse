import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // icons

/**
 * Represents the view responsible for displaying a list of search result.
 */
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = `No recipes found for your query! Please try again ;)`;

  /**
   * Generates the markup (list items) for each search result item
   * @returns {string} Markup for the Search result items
   */
  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
