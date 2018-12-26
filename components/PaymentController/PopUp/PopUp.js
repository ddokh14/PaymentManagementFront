(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class PopUp extends HTMLElement {

        set title(value){
            this.setAttribute('title',value);
        }

        get title(){
            return this.getAttribute('title');
        }

        get visible(){
            return this.getAttribute('visible');
        }

        set visible(value){
            if(value)this.setAttribute('visible','');
            else this.removeAttribute('visible');
        }
    
        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#pop-up-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            shadowRoot.querySelector('.title').innerHTML = this.title;
            this.listenCloseButton();
        }

        listenCloseButton(){
            const cross = this.shadowRoot.querySelector('.cross');
            cross.addEventListener('click', () => {
                this.visible = false;
            });
        }

        static get observedAttributes() {
            return ["visible"];
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            const elem = this.shadowRoot.querySelector('.pop-up-container');
            newValue===null? elem.classList.remove('visible') : elem.classList.add('visible');
        }

    }

    customElements.define('pop-up', PopUp);

})();