import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('text-customizer')
export class TextCustomizer extends LitElement {
  @state() text = 'Hello!';

  static styles = css`
    .controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      margin-top: 1rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
      width: 200px;
    }

    canvas {
      display: none;
    }
  `;

  updated() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.shadowRoot.getElementById('textCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1024;
    canvas.height = 1024;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.text, canvas.width / 2, canvas.height / 2);

    this.dispatchEvent(new CustomEvent('text-image-updated', {
      detail: { url: canvas.toDataURL() },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="controls">
        <label>Type your custom text:</label>
        <input type="text" .value=${this.text} @input=${e => this.text = e.target.value} />
        <canvas id="textCanvas"></canvas>
      </div>
    `;
  }
}
