(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class DividerLine extends HTMLElement {
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#divider-line-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
    }

    }

    customElements.define('divider-line', DividerLine);

})();