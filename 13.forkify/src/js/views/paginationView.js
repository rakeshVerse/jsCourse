import View from './View.js';
import icons from 'url:../../img/icons.svg'; // icons

/**
 * Represents the view responsible for displaying Pagination for ResultsView.
 */
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Generates pagination button(s) based on total search results
   * @returns {string} Pagination button(s) based
   */
  _generateMarkup() {
    const totPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currPage = this._data.currentPage;
    const prevPage = currPage - 1;
    const nextPage = currPage + 1;

    // Page 1 & other pages -> show next button
    if (totPages > 1 && currPage === 1) {
      return this._generateMarkupButtonNext(nextPage);
    }

    // Last page -> show previous button
    if (totPages === currPage && totPages > 1) {
      return this._generateMarkupButtonPrev(prevPage);
    }

    // Other than page 1 -> show previous & next button
    if (currPage > 1) {
      // prettier-ignore
      return `${this._generateMarkupButtonPrev(prevPage)} ${this._generateMarkupButtonNext(nextPage)}`;
    }

    // Page 1 & no other pages -> don't show any buttons
    return ``;
  }

  /**
   *
   * @param {*} prev
   * @returns
   */
  _generateMarkupButtonPrev(prev) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${prev}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prev}</span>
      </button>
      `;
  }

  _generateMarkupButtonNext(next) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${next}">
        <span>Page ${next}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }

  /**
   * Adds an event listner to the Pagination buttons
   * @param {Function} handler The callback function to be executed when Pagination button is clicked
   */
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
}

export default new PaginationView();
