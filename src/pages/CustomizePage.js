import { LitElement, html, css } from 'lit';

customElements.define('customize-page', class extends LitElement {
  static properties = {
    type: { type: String }
  };

  static styles = css`
    .container {
      text-align: center;
      padding: 2rem;
    }

    model-viewer {
      width: 100%;
      max-width: 600px;
      height: 500px;
      margin: auto;
    }

    button {
      margin-top: 1.5rem;
      padding: 0.6rem 1.2rem;
      font-size: 1rem;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background: #555;
    }
  `;

  constructor() {
    super();
    this.type = new URLSearchParams(window.location.search).get('type') || 'tshirt';
  }

  goBack() {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    const modelSrc = `/models/${this.type}.glb`;
    const capitalized = this.type.charAt(0).toUpperCase() + this.type.slice(1);

    return html`
      <div class="container">
        <h2>Customize your ${capitalized}</h2>
        <model-viewer 
          src="${modelSrc}" 
          alt="3D model of ${this.type}" 
          auto-rotate 
          camera-controls 
          ar 
          disable-zoom
          exposure="1"
          shadow-intensity="1"
          style="background-color: transparent;"
        ></model-viewer>
        <button @click=${this.goBack}>← Back</button>
      </div>
    `;
  }
});
