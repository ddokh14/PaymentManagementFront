(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class SimpleFilter extends HTMLElement {
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#simple-filter-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }

    }

    customElements.define('simple-filter', SimpleFilter);

})();