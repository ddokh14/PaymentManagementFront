(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class AddButton extends HTMLElement {
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#add-button-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        //init popup for new paymend form;
        const body = document.querySelector('body');
        const paymentForm = document.createElement('new-payment-form');
        const elem = document.createElement('pop-up');
        elem.title = "add new payment";
        elem.appendChild(paymentForm);
        body.appendChild(elem);
        const popup = body.querySelector('pop-up');
        this.addEventListener('click',() => {
            if(!popup.visible) popup.visible = true;
        });
    }

    }

    customElements.define('add-button', AddButton);

})();