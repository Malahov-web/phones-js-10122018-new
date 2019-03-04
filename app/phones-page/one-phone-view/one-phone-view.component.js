import {BaseComponent} from '../../common/components/base/base.component.js';

export class OnePhoneViewComponent extends BaseComponent {

    constructor({element, onBackToCatalog}){
        super({ element });

        this.onBackToCatalog = onBackToCatalog;
        this._element.addEventListener('click', this._gotoCatalog.bind(this))
    }

    show(phone) {
        this._phone = phone;
        this._render();
        super.show();
        this._gallery( document.querySelector('#item') );
    }
    _gotoCatalog({ target }) {
        const buttonBack = target.closest('#back');
        if (!buttonBack) {
            return;
        }
        this.onBackToCatalog(buttonBack.dataset.id);
    }

    _gallery(rootEl) {

        let thumbnails = rootEl.querySelector('.phone-thumbs');
        let mainImage  = rootEl.querySelector('img.phone');
        let currentSrc = mainImage.src;

        thumbnails.addEventListener('click', changeImage);

        function changeImage(event) {

            if ( event.target.tagName  === 'IMG' ) {

                let newSrc = event.target.src;

                if ( newSrc !== currentSrc ) {
                    mainImage.setAttribute('src', newSrc);
                    currentSrc = newSrc;
                }
            }

        }
    }

    _render() {
        this._element.innerHTML = `
        <img class="phone" src="assets/${this._phone.images[0]}">

        <button id="back">Back</button>
        <button>Add to basket</button>

        <h1>` + this._phone.id + `</h1>
        
        <p>` + this._phone.description + `</p>

        <ul class="phone-thumbs">

            ${this._phone.images.reduce((html, image) => {
                return `${html}     
                <li class="thumbnail" data-id=${image}>
                <img src="assets/${image}">
                </li>`
            }, '')}

        </ul>

    <ul class="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>Availability</dt>
          <dd></dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>        
          <dt>Type</dt>
          <dd>${this._phone.battery.type}</dd>
          <dt>Talk Time</dt>
          <dd>${this._phone.battery.talkTime}</dd>
          <dt>Standby time (max)</dt>
          <dd>${this._phone.battery.standbyTime}</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>${this._phone.battery.type}</dd>
          <dt>Internal Storage</dt>
          <dd>${this._phone.battery.type}</dd>
        </dl>
      </li>  
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd>${this._phone.connectivity.cell}</dd>
          <dt>WiFi</dt>
          <dd>${this._phone.connectivity.wifi}</dd>
          <dt>Bluetooth</dt>
          <dd>${this._phone.connectivity.bluetooth}</dd>
          <dt>Infrared</dt>
          <dd>${ this._phone.connectivity.infrared ? '✓' : '✘'}</dd>
          <dt>GPS</dt>
          <dd>${ this._phone.connectivity.gps ? '✓' : '✘'}</dd>
        </dl>
      </li>  
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>${this._phone.android.os}</dd>
          <dt>UI</dt>
          <dd>${this._phone.android.ui}</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          
            ${this._phone.sizeAndWeight.dimensions.reduce((html, dimension) => {
            return `${html}
                <dd>${dimension}</dd>`
            }, '')}

          <dt>Weight</dt>
          <dd>${this._phone.sizeAndWeight.weight}</dd>
        </dl>
      </li>      
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>${this._phone.display.screenSize}</dd>
          <dt>Screen resolution</dt>
          <dd>${this._phone.display.screenResolution}</dd>
          <dt>Touch screen</dt>
          <dd>${this._phone.display.touchScreen ? '✓' : '✘'}</dd>
        </dl>
      </li>     
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>${this._phone.hardware.cpu}</dd>
          <dt>USB</dt>
          <dd>${this._phone.hardware.usb}</dd>
          <dt>Audio / headphone jack</dt>
          <dd>${this._phone.hardware.audioJack}</dd>
          <dt>FM Radio</dt>
          <dd>${ this._phone.hardware.fmRadio ? '✓' : '✘'}</dd>
          <dt>Accelerometer</dt>
          <dd>${ this._phone.hardware.accelerometer ? '✓' : '✘'}</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>${this._phone.camera.primary}</dd>
          <dt>Features</dt>
          <dd>
          
            ${this._phone.camera.features.reduce((html, feature) => {
            return `${html}
                <span>${feature}</span>`
            }, '')}
                              
</dd>
        </dl>
      </li>   
      <li>
        <span>Additional Features</span>
        <dd>${this._phone.additionalFeatures}</dd>
      </li>
    </ul>
    `
    }
}

