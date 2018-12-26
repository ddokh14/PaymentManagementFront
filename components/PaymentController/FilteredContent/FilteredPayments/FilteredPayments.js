(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    function createPaymentElement(payment){
        const elem = document.createElement("filtered-payment");
        elem.title = payment.title;
        elem.category = payment.category;
        elem.date = payment.date;
        elem.amount = payment.amount;
        elem.currency = payment.currency;
        elem.comment = payment.comment;
        return elem;
    }

    class FilteredPayments extends HTMLElement {
    
        constructor(){
            super();
            let _list = [];
            Object.defineProperty(this, 'list', {
                get: () => _list,
                set: (list) => {
                _list = list;
                this.render();
                }
            });
        }

        set paymentList(list){

        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filtered-payments-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

        render(){
            const fp = this.shadowRoot.querySelector('.filtered-payments');
            fp.innerHTML='';
            let total = 0;
            this.list.forEach(payment => {
                let elem = createPaymentElement(payment);
                fp.appendChild(elem);
                total=total + parseFloat(payment.amount);
            });
            this.shadowRoot.querySelector('.payment-total').querySelector('p').querySelector('span').innerHTML=total.toFixed(2);
            this.shadowRoot.querySelector('.filtered-payments-title').querySelector('p').querySelector('span').innerHTML=this.list.length;
        }

    }

    customElements.define('filtered-payments', FilteredPayments);

})();