class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Card Title';
        const img = this.getAttribute('img') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    transition: transform 0.2s;
                }

                :host(:hover) {
                    transform: translateY(-4px);
                }

                img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                }

                .content {
                    padding: 1.5rem;
                }

                h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                }

                p {
                    margin: 0;
                    color: #64748b;
                    line-height: 1.5;
                }
            </style>
            ${img ? `<img src="${img}" alt="${title}">` : ''}
            <div class="content">
                <h3>${title}</h3>
                <p><slot></slot></p>
            </div>
        `;
    }
}

customElements.define('my-card', MyCard);
export default MyCard;
