(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class ExtendedFilter extends HTMLElement {
    
        constructor(){
            super();
        }
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#extended-filter-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        const pc = document.querySelector('payment-controller');
        //Listener for amount from input
        const amountFrom = this.shadowRoot.querySelector('.extended-filter-container').querySelector('#amount-section').querySelector('#amount-from').shadowRoot.querySelector('input');
        amountFrom.addEventListener('keyup',() => {
            pc.filterAmountFrom = amountFrom.value;
        });
        //Listener for amount to input
        const amountTo =this.shadowRoot.querySelector('.extended-filter-container').querySelector('#amount-section').querySelector('#amount-to').shadowRoot.querySelector('input');
        amountTo.addEventListener('keyup',() => {
            pc.filterAmountTo = amountTo.value;
        });
        //Listener for date from input
        const dateFrom =this.shadowRoot.querySelector('.extended-filter-container').querySelector('#date-section').querySelector('#date-from').shadowRoot.querySelector('input');
        dateFrom.addEventListener('change',() => {
            pc.filterDateFrom = dateFrom.value;
        });
        //Listener for date to input
        const dateTo =this.shadowRoot.querySelector('.extended-filter-container').querySelector('#date-section').querySelector('#date-to').shadowRoot.querySelector('input');
        dateTo.addEventListener('change',() => {
            pc.filterDateTo = dateTo.value;
        });
    }

    get expanded() {
        return this.hasAttribute("expanded");
    }
     
    set expanded(value) {
        if (value) {
            this.setAttribute("expanded", "");
        } else {
            this.removeAttribute("expanded");
        }
    }

    static get observedAttributes() {
        return ["expanded"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "expanded" && this.shadowRoot) {
          if (newValue === null) {
            this.shadowRoot.querySelector(".extended-filter-container").classList.remove("expanded");
          } else {
            this.shadowRoot.querySelector(".extended-filter-container").classList.add("expanded");
          }
        }
    }

    }

    customElements.define('extended-filter', ExtendedFilter);

})();