(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class SearchInput extends HTMLElement {
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#search-input-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        const pc = document.querySelector('payment-controller');
        const input = this.shadowRoot.querySelector('.search-input-container').querySelector('input');
        input.addEventListener('keyup',() => {
            pc.filterTitle = input.value;
        });
    }

    }

    customElements.define('search-input', SearchInput);

})();