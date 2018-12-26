(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class FilteredContent extends HTMLElement {
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filtered-content-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

    }

    customElements.define('filtered-content', FilteredContent);

})();