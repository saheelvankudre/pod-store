// src/components/CustomizerView.js
import { LitElement, html, css } from 'lit';

export class CustomizerView extends LitElement {
  static properties = {
    selectedClothing: { type: String },
    customText: { type: String },
    textureUrl: { type: String },
  };

  constructor() {
    super();
    this.selectedClothing = localStorage.getItem('selectedClothing') || 'tshirt';
    this.customText = '';
    this.textureUrl = '';
  }

  static styles = css`
    .container {
      text-align: center;
      padding: 1rem;
    }

    .back-button {
      margin-top: 1rem;
      font-size: 0.9rem;
      cursor: pointer;
      color: #646cff;
    }

    .input-box {
      margin: 1rem 0;
    }

    model-viewer {
      width: 100%;
      max-width: 400px;
      height: 400px;
    }

    canvas {
      display: none;
    }
  `;

  render() {
    const modelFile = `/models/${this.selectedClothing}.glb`;
    const labelMap = {
      tshirt: 'T-shirt',
      hoodie: 'Hoodie',
      shirt: 'Shirt',
      cap: 'Cap',
    };
    const label = labelMap[this.selectedClothing] || 'Clothing';

    return html`
      <div class="container">
        <h2>Customize your ${label} here!</h2>

        <div class="input-box">
          <input
            type="text"
            placeholder="Enter your text"
            @input=${this.handleTextChange}
          />
        </div>

        <model-viewer
          src="${modelFile}"
          alt="3D model of a ${label}"
          auto-rotate
          camera-controls
          disable-zoom
          exposure="1"
          environment-image="neutral"
          skybox-image=""
        >
          ${this.textureUrl
            ? html`<img slot="hotspot-texture" src="${this.textureUrl}" />`
            : ''}
        </model-viewer>

        <canvas id="textCanvas" width="512" height="512"></canvas>

        <div class="back-button" @click=${this.goBack}>← Back</div>
      </div>
    `;
  }

  goBack() {
    window.history.back();
  }

  handleTextChange(e) {
    this.customText = e.target.value;
    this.updateTexture();
  }

  updateTexture() {
    const canvas = this.shadowRoot.getElementById('textCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background transparent
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw custom text
    ctx.fillStyle = 'black';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.customText, canvas.width / 2, canvas.height / 2);

    // Convert canvas to data URL
    this.textureUrl = canvas.toDataURL('image/png');
  }
}

customElements.define('customizer-view', CustomizerView);
