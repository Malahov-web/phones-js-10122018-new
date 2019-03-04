import {BaseComponent} from '../../common/components/base/base.component.js';

export class CartComponent extends BaseComponent {

    constructor({element, onRemoveFromCart}) {
        super({element});
        this.phonesInCart = {};
        this.onRemoveFromCart = onRemoveFromCart;

        this._render();
        this._element.addEventListener('click', this._removeFromCartHandler.bind(this))
    }

    add(addedPhoneId) {

        this.phonesInCart[addedPhoneId] ? this.phonesInCart[addedPhoneId]++ : this.phonesInCart[addedPhoneId] = 1;
        this._render();
    }

    remove(addedPhoneId) {

        delete this.phonesInCart[addedPhoneId];
        this._render();
    }

    _removeFromCartHandler({target}) {
        const removeElement = target.closest('.remove');
        if (!removeElement) {
            return;
        }

        this.onRemoveFromCart(removeElement.closest('li').dataset.id);
    }

    _render() {

        let phonesInCartTemplate = '';
        for (let key in this.phonesInCart) {
            phonesInCartTemplate += '<li data-id="' + key + '">' + key + ' : ' + this.phonesInCart[key] + '<span class="remove" title="remove item form cart">✘</span></li>';
        }

        this._element.innerHTML = `
            <p>Shopping Cart</p>
            <ul>
              ${phonesInCartTemplate}
            </ul>        
        `;
    }

}
