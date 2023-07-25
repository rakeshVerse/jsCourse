import View from './View.js';
import icons from 'url:../../img/icons.svg'; // icons
import { Fraction } from 'fractional';

/**
 * Represents the view responsible for displaying the recipe.
 */
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _error = `We could not find that recipe. Please try another one!`;
  _message;

  /**
   * Generates markup for displaying recipe based on provided data.
   * @returns {string} Markup for displaying recipe
   */
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients
          .map(ingredient => this._generateMarkupIngredients(ingredient))
          .join('')}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }

  /**
   * Generates markup for displaying an ingredient
   * @param {Object} ingredient An Object contains ingredient, unit and quantity
   * @returns {string} Markup for displaying an ingredient
   */
  _generateMarkupIngredients(ingredient) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity
            ? new Fraction(ingredient.quantity).toString()
            : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
        </div>
      </li>`;
  }

  /**
   * Adds an event listener to the window to handle hashchange and load events
   * The 'handler' function acts as a Subscriber in the Controller component.
   * @param {Function} handler The callback function to be executed when window loads or URL hash changes
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Adds an event listener to the Update servings buttons
   * The 'handler' function acts as a Subscriber in the Controller component.
   * @param {Function} handler The callback function to be executed when Update servings buttons are clicked
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  /**
   * Adds an event listener to the bookmark button to handle adding/removing bookmark.
   * @param {Function} handler The callback function to be executed when the bookmark button is clicked
   */
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();
