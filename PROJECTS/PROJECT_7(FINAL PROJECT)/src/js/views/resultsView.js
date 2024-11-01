import View from './View.js';
import icons from 'url:../../img/icons.svg';
class ResultView extends View {
  _parentElement = document.querySelector('.results ');
  _errorMessage = 'No result Found!!';

  _generateHTML() {
    return this._data.map(this._generateHTMLPreview).join('');
  }
  _generateHTMLPreview(result) {
    return `
    <li class="preview">
        <a class="preview__link " href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultView();
