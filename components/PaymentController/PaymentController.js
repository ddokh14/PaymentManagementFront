(function(){
    
    const currentDocument = document.currentScript.ownerDocument;


    class PaymentController extends HTMLElement {
        
        constructor(){
            super();
            let _payments = [];
            Object.defineProperty(this, 'payments', {
                get: () => _payments,
                set: (list) => {
                    _payments = list;
                    this.render();
                }
            });
        }


        /*Attribute Getters and Setters*/
        set filterTitle(value){
            if(value==="") this.removeAttribute('filter-title');
            else this.setAttribute('filter-title',value);
        }

        get filterTitle(){
            return this.getAttribute('filter-title');
        }

        set filterCategory(value){
            if(value === this.filterCategory) this.removeAttribute('filter-category');
            else this.setAttribute('filter-category',value);
        }

        get filterCategory(){
            return this.getAttribute('filter-category');
        }

        set filterAmountFrom(value){
            if(value === "") this.removeAttribute('filter-amount-from');
            else this.setAttribute('filter-amount-from',value);
        }

        get filterAmountFrom(){
            return this.getAttribute('filter-amount-from');
        }

        set filterAmountTo(value){
            if(value === "") this.removeAttribute('filter-amount-to');
            else this.setAttribute('filter-amount-to',value);
        }

        get filterAmountTo(){
            return this.getAttribute('filter-amount-to');
        }

        set filterDateFrom(value){
            if(value === "") this.removeAttribute('filter-date-from');
            else this.setAttribute('filter-date-from',value);
        }

        get filterDateFrom(){
            return this.getAttribute('filter-date-from');
        }

        set filterDateTo(value){
            if(value === "") this.removeAttribute('filter-date-to');
            else this.setAttribute('filter-date-to',value);
        }

        get filterDateTo(){
            return this.getAttribute('filter-date-to');
        }
        /* END */

        static get observedAttributes() {
            return ["filter-title","filter-category","filter-amount-from","filter-amount-to","filter-date-from","filter-date-to"];
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            let filtered = this.payments;
            if(this.filterTitle) filtered = filtered.filter(item => item.title.includes(this.filterTitle));
            if(this.filterCategory) filtered = filtered.filter(item => item.category.includes(this.filterCategory));
            if(this.filterAmountFrom) filtered = filtered.filter(item => item.amount * 1 > this.filterAmountFrom * 1);
            if(this.filterAmountTo) filtered = filtered.filter(item => item.amount * 1 < this.filterAmountTo * 1);
            if(this.filterDateFrom) filtered = filtered.filter(item => new Date(item.date) > new Date(this.filterDateFrom));
            if(this.filterDateTo) filtered = filtered.filter(item => new Date(item.date) < new Date(this.filterDateTo));
            const fp = this.shadowRoot.querySelector('filtered-content').shadowRoot.querySelector('filtered-payments');
            fp.list = filtered;
        }

        fetchAndRender(){
            const url = 'http://localhost:3001/api/payments';
            fetch(url)
            .then((resp) => resp.json())
            .then((payments) => {
                this.payments = payments.reverse();
                this.render();
            }).catch((error) => {
                console.log(error);
            })
        }

        render(){
            const fp = this.shadowRoot.querySelector('filtered-content').shadowRoot.querySelector('filtered-payments');
            fp.list = this.payments;
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#payment-controller-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            this.fetchAndRender();
        }

    }

    customElements.define('payment-controller', PaymentController);

})();