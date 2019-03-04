import {PhonesCatalogComponent} from './phone-catalog/phone-catalog.component.js';
import {OnePhoneViewComponent} from './one-phone-view/one-phone-view.component.js';
import {PhonesPageService} from './phones-page.service.js';
import {CartComponent} from './cart/cart.component.js';
import {FilterComponent} from './filter/filter.component.js';

export class PhonesPageComponent {
    constructor({element}) {
        this.element = element;
        this._render();

        this._initPhoneService();

        this._initCatalog();

        this._initOnePhoneView();

        this._initCart();

        this._initFilter();
    }

    _initCatalog() {
        this._phoneCatalog = new PhonesCatalogComponent({
            element: this.element.querySelector('#catalog'),
            phones: this._phoneService.getAllPhones(),
            onPhoneSelect: (phoneId) => {
                console.dir(this._phoneCatalog.phones);
                const phoneDetails = this._phoneService.getPhonesById(phoneId);
                this._phoneCatalog.hide();
                this._phoneViewer.show(phoneDetails);
            },
            onAddToCart: (phoneId) => {
                this._cart.add(phoneId);
            }
        });
    }

    _initOnePhoneView() {
        this._phoneViewer = new OnePhoneViewComponent({
            element: this.element.querySelector('#item'),
            onBackToCatalog: () => {
                this._phoneCatalog.show();
                this._phoneViewer.hide();
            }
        });
    }

    _initPhoneService() {
        this._phoneService = new PhonesPageService();
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this.element.querySelector('#cart'),
            onRemoveFromCart: (phoneId) => {
                this._cart.remove(phoneId);
            }
        });
    }

    _initFilter() {
        this._filter = new FilterComponent({
            element: this.element.querySelector('#filter'),

            onFilter: (keyWordText, sortValue) => {

                this._phoneCatalog.phones = this._phoneService.getAllPhonesSorted(keyWordText, sortValue);
                this._phoneCatalog.render();
            }
        });

    }


    _render() {
        this.element.innerHTML = ` <div class="row">

    <!--Sidebar-->
    <div class="col-md-2">
      <section id="filter">

      </section>

      <section id="cart">
      </section>
    </div>

    <!--Main content-->
    <div class="col-md-10" >
      <div id="catalog"></div>
      <div id="item"></div>
    </div>

  </div>`;
    }
}

