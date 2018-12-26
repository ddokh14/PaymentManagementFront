(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class BarChart extends HTMLElement {
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#bar-chart-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        }

    }

    customElements.define('bar-chart', BarChart);

})();