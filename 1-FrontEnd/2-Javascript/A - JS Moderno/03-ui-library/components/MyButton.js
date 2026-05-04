class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['variant'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const variant = this.getAttribute('variant') || 'primary';
        
        this.shadowRoot.innerHTML = `
            <style>
                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: inherit;
                    font-size: 14px;
                }

                .primary { background: #3b82f6; color: white; }
                .primary:hover { background: #2563eb; }

                .secondary { background: #64748b; color: white; }
                .secondary:hover { background: #475569; }

                .danger { background: #ef4444; color: white; }
                .danger:hover { background: #dc2626; }

                button:active { transform: scale(0.95); }
            </style>
            <button class="${variant}">
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('my-button', MyButton);
export default MyButton;
