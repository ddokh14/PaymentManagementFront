(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class FilterSection extends HTMLElement {
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filter-section-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

    }

    customElements.define('filter-section', FilterSection);

})();