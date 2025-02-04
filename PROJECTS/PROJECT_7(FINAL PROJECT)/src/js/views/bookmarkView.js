import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks Found!!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }
  _generateHTML() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
