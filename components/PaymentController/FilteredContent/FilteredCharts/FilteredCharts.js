(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class FilteredCharts extends HTMLElement {
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filtered-charts-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

    }

    customElements.define('filtered-charts', FilteredCharts);

})();