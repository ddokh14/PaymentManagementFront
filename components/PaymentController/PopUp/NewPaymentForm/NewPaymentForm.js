(function(){
    
    const currentDocument = document.currentScript.ownerDocument;

    class NewPaymentForm extends HTMLElement {

        connectedCallback() {
            const shadowRoot = this.attachShadow({ mode: 'open' });
            const template = currentDocument.querySelector('#new-payment-form-template');
            const instance = template.content.cloneNode(true);
            shadowRoot.appendChild(instance);
            this.listenCreateButton();
        }

        listenCreateButton(){
            const btn = this.shadowRoot.querySelector('button');
            btn.addEventListener('click', () =>{
                let payment = {
                    title: this.shadowRoot.querySelector('#title').value,
                    amount: this.shadowRoot.querySelector('#amount').value,
                    category: this.shadowRoot.querySelector('#category').value,
                    date: this.shadowRoot.querySelector('#date').value,
                    comment: this.shadowRoot.querySelector('#comment').value
                }
                if(payment.title && payment.amount && 
                payment.category && payment.date && 
                payment.comment) {
                    this.postData(payment);
                    this.clearForm();
                    this.closePopUp();
                } else {
                    alert("Fill in all inputs");
                }
            });
        }

        clearForm(){
            this.shadowRoot.querySelector('#title').value = "";
            this.shadowRoot.querySelector('#amount').value = "";
            this.shadowRoot.querySelector('#category').value = "";
            this.shadowRoot.querySelector('#date').value = "";
            this.shadowRoot.querySelector('#comment').value = "";
        }

        closePopUp(){
            this.parentElement.visible = false;
        }

        postData(payment){
            const pc = document.querySelector('payment-controller');
            const url = 'http://localhost:3001/api/payments';
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(payment),
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(response => {
                let temp = pc.payments;
                temp.unshift(response);
                pc.payments = temp;
            }).catch(error => console.error('Error:', error));
        }

    }

    customElements.define('new-payment-form', NewPaymentForm);

})();