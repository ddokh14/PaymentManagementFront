(function(){

  const currentDocument = document.currentScript.ownerDocument;

  class AppBar extends HTMLElement {
    
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = currentDocument.querySelector('#app-bar-template');
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);
    }

  }

  customElements.define('app-bar', AppBar);

})(); 