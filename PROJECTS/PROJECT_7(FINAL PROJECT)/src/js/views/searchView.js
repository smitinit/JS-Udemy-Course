class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const searchQueryResult =
      this._parentEl.querySelector('.search__field').value;

    this._clearField();
    return searchQueryResult;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearField() {
    this._parentEl.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
