import { LitElement, html, css } from 'lit';
import '@google/model-viewer';

customElements.define('designer-page', class extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      background: #000;
      color: white;
      font-family: 'Segoe UI', sans-serif;
    }

    .header {
      padding: 10px 20px;
      font-size: 18px;
    }

    .container {
      display: flex;
      flex-direction: row;
      height: calc(100vh - 60px);
      justify-content: center;
      align-items: center;
      gap: 30px;
    }

    .image-preview-box {
      width: 500px;
      height: 500px;
      background: #222;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 10px rgba(255,255,255,0.2);
    }

    .viewer-wrapper {
      position: relative;
      width: 500px;
      height: 500px;
      border-radius: 16px;
      overflow: hidden;
      background: #111;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    }

    model-viewer {
      width: 100%;
      height: 100%;
      background: transparent;
    }

    .canvas-text, .canvas-logo {
      position: absolute;
      cursor: move;
      z-index: 10;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .canvas-text {
      color: white;
      font-size: 18px;
      font-weight: bold;
      background: rgba(0, 0, 0, 0.4);
    }

    .canvas-logo img {
      max-width: 100px;
      max-height: 100px;
      border-radius: 6px;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      gap: 15px;
      background: #111;
      border-radius: 16px;
    }

    input[type="file"], input[type="text"] {
      font-size: 16px;
      padding: 6px;
      width: 100%;
    }

    button {
      background: white;
      color: black;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 8px;
      font-weight: bold;
    }

    .back-button {
      color: white;
      text-decoration: none;
      font-size: 16px;
      margin-bottom: 10px;
      display: inline-block;
    }
  `;

  static properties = {
    selectedClothing: { type: String },
    uploadedImage: { type: String },
    uploadedLogo: { type: String },
    customText: { type: String },
    textLocked: { type: Boolean },
    logoLocked: { type: Boolean }
  };

  constructor() {
    super();
    this.selectedClothing = localStorage.getItem('selectedClothing') || 'tshirt';
    this.uploadedImage = '';
    this.uploadedLogo = '';
    this.customText = '';
    this.textLocked = false;
    this.logoLocked = false;
  }

  getModelPath() {
    switch (this.selectedClothing) {
      case 'tshirt': return '/models/tshirt.glb';
      case 'hoodie': return '/models/hoodie.glb';
      case 'cap': return '/models/cap.glb';
      case 'shirt': return '/models/shirt.glb';
      default: return '/models/tshirt.glb';
    }
  }

  handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => this.uploadedImage = ev.target.result;
    reader.readAsDataURL(file);
  }

  handleLogoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      this.uploadedLogo = ev.target.result;
      this.updateComplete.then(() => this.makeDraggable('.canvas-logo', 'logoLocked'));
    };
    reader.readAsDataURL(file);
  }

  handleTextInput(e) {
    this.customText = e.target.value;
    this.updateComplete.then(() => this.makeDraggable('.canvas-text', 'textLocked'));
  }

  makeDraggable(selector, lockProp) {
    const el = this.renderRoot.querySelector(selector);
    if (!el) return;

    let isDragging = false, offsetX = 0, offsetY = 0;

    el.onmousedown = e => {
      if (this[lockProp]) return;
      isDragging = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    };

    window.onmousemove = e => {
      if (!isDragging) return;
      const wrapper = this.renderRoot.querySelector('.viewer-wrapper');
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - offsetX;
      const y = e.clientY - rect.top - offsetY;
      el.style.left = `${Math.max(0, Math.min(x, rect.width - el.clientWidth))}px`;
      el.style.top = `${Math.max(0, Math.min(y, rect.height - el.clientHeight))}px`;
    };

    window.onmouseup = () => isDragging = false;
  }

  toggleLock(type) {
    if (type === 'text') this.textLocked = !this.textLocked;
    if (type === 'logo') this.logoLocked = !this.logoLocked;
  }

  goBack() {
    history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  lockAndPreview() {
    const textEl = this.renderRoot.querySelector('.canvas-text');
    const logoEl = this.renderRoot.querySelector('.canvas-logo');

    const data = {
      model: this.getModelPath(),
      text: {
        value: this.customText,
        top: textEl?.style.top || '300px',
        left: textEl?.style.left || '200px',
      },
      logo: {
        src: this.uploadedLogo,
        top: logoEl?.style.top || '200px',
        left: logoEl?.style.left || '150px',
      }
    };

    localStorage.setItem('previewData', JSON.stringify(data));

    history.pushState(null, '', '/preview');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <div class="header">
        <a class="back-button" @click=${this.goBack}>← Back</a>
        <span>Customize your design</span>
      </div>

      <div class="container">
        <div class="image-preview-box">
          ${this.uploadedImage
            ? html`<img src="${this.uploadedImage}" style="max-width: 100%; max-height: 100%;" />`
            : html`<span style="color: #777;">No Image</span>`}
        </div>

        <div class="viewer-wrapper">
          <model-viewer
            src="${this.getModelPath()}"
            alt="3D clothing model"
            auto-rotate
            camera-controls
            ar
          ></model-viewer>

          ${this.customText
            ? html`<div class="canvas-text" style="top: 300px; left: 200px;">${this.customText}</div>`
            : ''}

          ${this.uploadedLogo
            ? html`<div class="canvas-logo" style="top: 200px; left: 150px;">
                    <img src="${this.uploadedLogo}" />
                  </div>`
            : ''}
        </div>

        <div class="sidebar">
          <label>Upload Image (for left box):</label>
          <input type="file" @change=${this.handleImageUpload} accept="image/*" />

          <label>Upload Logo (goes on 3D model):</label>
          <input type="file" @change=${this.handleLogoUpload} accept="image/*" />

          <label>Custom Text:</label>
          <input type="text" .value=${this.customText} @input=${this.handleTextInput} />

          <button @click=${() => this.toggleLock('text')}>
            ${this.textLocked ? '🔒 Text Locked' : '🔓 Lock Text'}
          </button>

          <button @click=${() => this.toggleLock('logo')}>
            ${this.logoLocked ? '🔒 Logo Locked' : '🔓 Lock Logo'}
          </button>

          <button @click=${this.lockAndPreview}>✅ Lock & Preview</button>
        </div>
      </div>
    `;
  }
});
