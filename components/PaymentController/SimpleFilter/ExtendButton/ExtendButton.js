(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class ExtendButton extends HTMLElement {
    
    constructor(){
        super();
    }
    

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#extend-button-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        let elem = shadowRoot.querySelector('.extend-button');
        elem.addEventListener('click', () =>  this.toggleExpandedFilter());
    }

    toggleExpandedFilter(){
        const filt = document.querySelector('payment-controller').shadowRoot.querySelector('extended-filter');
        filt.expanded ? filt.expanded=false : filt.expanded=true;
    }

    }

    customElements.define('extend-button', ExtendButton);

})();