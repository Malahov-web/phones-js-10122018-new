import {BaseComponent} from "../../common/components/base/base.component.js";

export class FilterComponent extends BaseComponent {

    constructor({element, onSearch, searchedPhones, onSort, onFilter}) {
        super({element});

        this.onSearch = onSearch;
        this.searchedPhones = searchedPhones;
        this.keyWord = '';

        this.onSort = onSort;
        this.sortType = 'name';

        this._render();


        this.onFilter = onFilter;
        this.searchField = this._element.querySelector('#filter_search');
        this.searchField.addEventListener('input', this.searchHandler.bind(this));

        this.sortField = this._element.querySelector('#filter_sort');
        this.sortField.addEventListener('change', this.sortHandler.bind(this));

        this.resetField = this._element.querySelector('#reset');
        this.resetField.addEventListener('click', this.resetHandler.bind(this));
    }

    searchHandler({target}) {
        const searchInputElement = target.closest('#filter_search');
        if (!searchInputElement) {
            return;
        }
        // console.log(searchInputElement);
        // console.log(searchInputElement.value);
        this.keyWord = searchInputElement.value;
        setTimeout(() => {
            this.onFilter(this.keyWord, this.sortType);
        }, 400)

    }

    sortHandler({target}) {
        const sortSelectElement = target.closest('#filter_sort');
        if (!sortSelectElement) {
            return;
        }
        this.sortType = sortSelectElement.value;
        setTimeout(() => {
            this.onFilter(this.keyWord, this.sortType);
        }, 400)

    }

    resetHandler({target}) {
        const sortSelectElement = target.closest('#reset');
        if (!sortSelectElement) {
            return;
        }

        this._resetFilter();

        setTimeout(() => {
            this.onFilter(this.keyWord, this.sortType);
        }, 400)

    }

    _resetFilter() {
        this.keyWord = '';
        this.sortType = 'name';
        this.searchField.value = "";
        this.sortField.value = "name";
    }

    _render() {
        this._element.innerHTML = `
            <p>
              Search:
              <input id="filter_search">
            </p>

            <p>
              Sort by:
              <select id="filter_sort">
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
            
            <p>Reset filter:
            <button class="reset" id="reset">x</button></p>
        `

    }
}
