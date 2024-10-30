class SearchView {
  #parentEl = document.querySelector('.search');
  getQuery() {
    const searchQueryResult =
      this.#parentEl.querySelector('.search__field').value;

    this.#clearField();
    return searchQueryResult;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearField() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
