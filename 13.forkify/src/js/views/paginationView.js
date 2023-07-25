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
      return this._generateMarkupButton('next', nextPage);
    }

    // Last page -> show previous button
    if (totPages === currPage && totPages > 1) {
      return this._generateMarkupButton('prev', prevPage);
    }

    // Other than page 1 -> show previous & next button
    if (currPage > 1) {
      // prettier-ignore
      return `${this._generateMarkupButton('prev', prevPage)} ${this._generateMarkupButton('next', nextPage)}`;
    }

    // Page 1 & no other pages -> don't show any buttons
    return ``;
  }

  /**
   * Generates Pagination button
   * @param {string} direction Direction (next or prev) of buttons to be generated
   * @param {number} page Display page number to go to
   * @returns {string} Button markup
   */
  _generateMarkupButton(direction, page) {
    const arrowLeft =
      direction === 'prev'
        ? `<svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>`
        : '';

    const arrowRight =
      direction === 'next'
        ? `<svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>`
        : '';

    return `
      <button class="btn--inline pagination__btn--${direction}" data-goto="${page}">
        ${arrowLeft}
        <span>Page ${page}</span>
        ${arrowRight}
      </button>
      `;
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
