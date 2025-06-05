import { LitElement, html, css } from 'lit';

export class TShirtViewer extends LitElement {
  static properties = {
    selectedClothing: { type: String },
    uploadedImageUrl: { type: String }
  };

  static styles = css`
    model-viewer {
      width: 100%;
      height: 400px;
      background: transparent;
    }
  `;

  updated() {
    if (this.uploadedImageUrl) {
      this.applyImageOverlay(this.uploadedImageUrl);
    }
  }

  applyImageOverlay(imageUrl) {
    const canvas = this.shadowRoot.getElementById('shirtCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw image small at center
      const size = 100;
      ctx.drawImage(img, canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size);
    };
    img.src = imageUrl;
  }

  render() {
    return html`
      <model-viewer
        id="shirtModel"
        src="/models/${this.selectedClothing}.glb"
        ar
        auto-rotate
        camera-controls
        environment-image="neutral"
        exposure="1"
        shadow-intensity="1"
      ></model-viewer>

      <canvas id="shirtCanvas" width="512" height="512" style="display: none;"></canvas>
    `;
  }
}

customElements.define('tshirt-viewer', TShirtViewer);
