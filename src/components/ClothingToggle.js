import { LitElement, html, css } from 'lit';

customElements.define('clothing-toggle', class extends LitElement {
  static styles = css`
    .toggle-wrapper {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      border: 2px solid #ccc;
      border-radius: 50%;
      padding: 1rem;
      background: white;
      font-size: 1.5rem;
      cursor: pointer;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s, background 0.3s;
    }

    button.selected {
      border-color: #2563eb;
      background: #2563eb10;
    }
  `;

  constructor() {
    super();
    this.selected = 'tshirt';
  }

  handleSelect(type) {
    this.selected = type;
    this.dispatchEvent(new CustomEvent('clothing-selected', {
      detail: { type },
      bubbles: true,
      composed: true
    }));
    this.requestUpdate();
  }

  render() {
    const types = [
      { type: 'tshirt', emoji: '👕' },
      { type: 'hoodie', emoji: '🧥' },
      { type: 'shirt', emoji: '👔' },
      { type: 'cap', emoji: '🧢' },
    ];

    return html`
      <div class="toggle-wrapper">
        ${types.map(({ type, emoji }) => html`
          <button 
            class=${this.selected === type ? 'selected' : ''}
            @click=${() => this.handleSelect(type)}
            title=${type}
          >
            ${emoji}
          </button>
        `)}
      </div>
    `;
  }
});
