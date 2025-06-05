import { LitElement, html, css } from 'lit';
import '@google/model-viewer';

customElements.define('preview-page', class extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      background: black;
      color: white;
      font-family: 'Segoe UI', sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      font-size: 18px;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 60px);
    }

    .viewer-wrapper {
      position: relative;
      width: 600px;
      height: 600px;
      background: #111;
      border-radius: 16px;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
      overflow: hidden;
    }

    model-viewer {
      width: 100%;
      height: 100%;
    }

    .canvas-text, .canvas-logo {
      position: absolute;
      z-index: 10;
    }

    .canvas-text {
      color: white;
      font-size: 20px;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.4);
      padding: 4px 8px;
      border-radius: 6px;
    }

    .canvas-logo img {
      max-width: 120px;
      max-height: 120px;
      border-radius: 6px;
    }

    button {
      background: #222;
      color: white;
      border: 1px solid white;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover {
      background: #444;
    }
  `;

  static properties = {
    model: { type: String },
    text: { type: Object },
    logo: { type: Object },
  };

  constructor() {
    super();
    const data = JSON.parse(localStorage.getItem('previewData') || '{}');
    this.model = data.model || '/models/tshirt.glb';
    this.text = data.text || { value: '', top: '300px', left: '200px' };
    this.logo = data.logo || { src: '', top: '200px', left: '150px' };
  }

  goBack() {
    history.pushState(null, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  async downloadScreenshot() {
    const wrapper = this.renderRoot.querySelector('.viewer-wrapper');
    const canvas = await html2canvas(wrapper);
    const link = document.createElement('a');
    link.download = 'shirt_preview.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  render() {
    return html`
      <!-- Header Buttons -->
      <div class="header">
        <button @click=${this.goBack}>← Back</button>
        <div>Final Preview</div>
        <button @click=${this.downloadScreenshot}>📥 Download</button>
      </div>

      <!-- 3D Model Viewer + Text + Logo -->
      <div class="container">
        <div class="viewer-wrapper" id="preview-area">
          <model-viewer
            src="${this.model}"
            alt="3D model preview"
            auto-rotate
            camera-controls
            ar
          ></model-viewer>

          ${this.text.value
            ? html`<div class="canvas-text" style="top: ${this.text.top}; left: ${this.text.left};">
                ${this.text.value}
              </div>`
            : ''}

          ${this.logo.src
            ? html`<div class="canvas-logo" style="top: ${this.logo.top}; left: ${this.logo.left};">
                <img src="${this.logo.src}" />
              </div>`
            : ''}
        </div>
      </div>
    `;
  }

  async firstUpdated() {
    // Dynamically load html2canvas only when needed
    if (!window.html2canvas) {
      await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    }
  }
});
