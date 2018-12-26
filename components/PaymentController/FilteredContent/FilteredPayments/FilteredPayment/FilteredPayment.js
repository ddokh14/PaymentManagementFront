(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];
    const weekNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];


    function formatDate(dateString){
        const date = new Date(dateString);
        const weekDay = date.getDay();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return "on " + weekNames[weekDay] +", " + day + " " + monthNames[month] + " " + year;
    }

    class FilteredPayment extends HTMLElement {
    
        constructor(){
            super();
            this.addEventListener('click', e => {
                this.togglePayment();
            });
        }

        set title(title){
            this.setAttribute('title',title);
        }

        get title(){
            return this.getAttribute('title');
        }

        set category(category){
            this.setAttribute('category',category);
        }

        get category(){
            return this.getAttribute('category');
        }

        set date(date){
            this.setAttribute('date',date);
        }

        get date(){
            return this.getAttribute('date');
        }

        set amount(amount){
            this.setAttribute('amount',amount);
        }

        get amount(){
            return this.getAttribute('amount');
        }

        set currency(currency){
            this.setAttribute('currency',currency);
        }

        get currency(){
            return this.getAttribute('currency');
        }

        set comment(comment){
            this.setAttribute('comment',comment);
        }

        get comment(){
            return this.getAttribute('comment');
        }

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#filtered-payment-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            shadowRoot.querySelector('.payment-comment').style.display = 'none';
            shadowRoot.querySelector('.title').innerHTML = this.title;
            shadowRoot.querySelector('.category').innerHTML = this.category;
            shadowRoot.querySelector('.amount').innerHTML = `${this.amount}<span>${this.currency}</span>`;
            shadowRoot.querySelector('.date').innerHTML = formatDate(this.date);
            shadowRoot.querySelector('.comment').innerHTML = this.comment;
        }

        togglePayment(){
            let elem = this.shadowRoot.querySelector('.payment-comment');
            elem.style.display = elem.style.display == 'none' ? 'block' : 'none';
        }

    }

    customElements.define('filtered-payment', FilteredPayment);

})();