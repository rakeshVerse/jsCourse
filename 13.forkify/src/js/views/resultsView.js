import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // icons

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = `No recipes found for your query! Please try again ;)`;

  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
