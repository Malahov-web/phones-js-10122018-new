import {BaseComponent} from '../../common/components/base/base.component.js';

export class PhonesCatalogComponent extends BaseComponent {
    constructor({element, phones, onPhoneSelect, onAddToCart}) {
        super({element});
        this.phones = phones;
        this.onPhoneSelect = onPhoneSelect;
        this.onAddToCart = onAddToCart;
        this.render();
        this._element.addEventListener('click', this._gotoOnePhoneView.bind(this))
        this._element.addEventListener('click', this._addToCartHandler.bind(this))
    }

    _gotoOnePhoneView({target}) {
        const link_thumb = target.closest('.thumb');
        if (!link_thumb) {
            return;
        }
        this.onPhoneSelect(link_thumb.closest('.thumbnail').dataset.id);
    }

    _addToCartHandler({target}) {
        const addElement = target.closest('.btn-success');
        if (!addElement) {
            return;
        }
        this.onAddToCart(addElement.closest('.thumbnail').dataset.id);
    }

    render() {
        this._element.innerHTML = `
          <ul class="phones">
          ${this.phones.reduce((html, phone) => {
            return `${html}     <li class="thumbnail" data-id=${phone.id}>
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt=${phone.id} src=${`assets/${phone.imageUrl}`}>
          </a>
          <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success">
              Add
            </a>
          </div>
          <a href="#!/phones/${phone.id}" class="title">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>`
        }, '')}
   
      </ul>
    `
    }
}
