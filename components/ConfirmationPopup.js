class ConfirmationPopup{
    constructor(props, agree, cancel){
        this.props = props;
        this.agree = agree;
        this.cancel = cancel;

        this.html = [
            `<div class="confirmation-popup">`,
                `<button class="ov-button close-button" onclick="closePopup()">`,
                    `<img src="images/icons/close.svg" alt="close">`,
                `</button>`,
                `<p class="popup-desc">${this.props.description}</p>`,
                `<div class="popup-ok popup-action" onclick="${this.agree}">`,
                    `<p>Ja</p>`,
                `</div>`,
                `<div class="popup-cancel popup-action" onclick="${this.cancel}">`,
                    `<p>Nein</p>`,
                `</div>`,
            `</div>`
        ].join('');
    }

    render() {
        document.getElementById('confirmation-overlay').innerHTML = this.html;
        document.getElementById('confirmation-overlay').classList.add('is-visible');
    }
}

module.exports = ConfirmationPopup;