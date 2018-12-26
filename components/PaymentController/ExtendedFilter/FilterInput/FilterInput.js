(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class FilterInput extends HTMLElement {
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filter-input-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            const elem = shadowRoot.querySelector('.filter-input');
            elem.placeholder = this.getAttribute('placeholder');
            if(this.getAttribute('type')) {
                elem.type = this.getAttribute('type')
                if(elem.type === 'number') elem.setAttribute('step', 'any'); // for Decimals to be valid
                else if(elem.type === 'date') elem.setAttribute('required',''); //for input[type='date'] placeholder.
            }
        }

    }

    customElements.define('filter-input', FilterInput);

})();