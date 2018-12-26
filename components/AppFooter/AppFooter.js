(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class AppFooter extends HTMLElement {
    
    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = currentDocument.querySelector('#app-footer-template');
        const instance = template.content.cloneNode(true);
        shadowRoot.appendChild(instance);
        shadowRoot.querySelector('#date-year').innerHTML = (new Date()).getFullYear();
    }

    }

    customElements.define('app-footer', AppFooter);

})();