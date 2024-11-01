import View from './View.js';
import previewView from './previewView.js';
class ResultView extends View {
  _parentElement = document.querySelector('.results ');
  _errorMessage = 'No result Found!!';

  _generateHTML() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
