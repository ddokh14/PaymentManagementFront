(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class CategoryTag extends HTMLElement {
    

        get isActive(){
            return this.hasAttribute('active');
        }

        set active(active){
            if(!active) this.removeAttribute('active');
            else this.setAttribute('active','')
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#category-tag-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            shadowRoot.querySelector('.category-tag').innerHTML = this.getAttribute('name');
            this.addClickListener();
        }

        addClickListener(){
            const pc = document.querySelector('payment-controller');
            this.addEventListener('click',() => {
                pc.filterCategory = this.getAttribute('name');
                const elem = pc.shadowRoot.querySelector('extended-filter').shadowRoot.querySelector(`category-tag[active]`);
                if(elem && !this.isActive) {
                    elem.active = false;
                }
                this.active = !this.isActive;
            });
        }

        static get observedAttributes() {
            return ["active"];
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            const elem = this.shadowRoot.querySelector('.category-tag');
            this.isActive? elem.classList.add('active') : elem.classList.remove('active');
        }

    }

    customElements.define('category-tag', CategoryTag);

})();