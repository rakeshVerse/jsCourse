class SearchView {
  #parentElement = document.querySelector('.search');

  /**
   * Get search query submitted by user
   * @returns {string} query
   */
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clear();
    return query;
  }

  /**
   * Empty search field
   * @returns {undefined}
   */
  #clear() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  /**
   * Adds an event listener to the form element to handle form submissions.
   * The 'handler' function acts as a Subscriber in the Controller component.
   * @param {Function} handler The callback function to be executed when the form is submitted.
   */
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
