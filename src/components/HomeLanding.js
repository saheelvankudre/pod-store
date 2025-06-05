// src/components/HomeLanding.js
import { LitElement, html, css } from 'lit';

export class HomeLanding extends LitElement {
  static styles = css`
    /* Import Codrops styles here and adjust as needed */
    :host {
      display: block;
      height: 100vh;
      background: #000;
      color: white;
      overflow: hidden;
    }
    .frame {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      animation: imageFade 8s infinite;
    }
    @keyframes imageFade {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .btn-enter {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      background: white;
      color: black;
      font-size: 1.2rem;
      cursor: pointer;
      border: none;
      border-radius: 4px;
    }
  `;

  constructor() {
    super();
    this.images = [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg'
    ];
  }

  render() {
    return html`
      ${this.images.map((img, index) => html`
        <div class="frame" style="background-image: url(${img}); animation-delay: ${index * 2}s;"></div>
      `)}
      <button class="btn-enter" @click=${() => window.history.pushState({}, '', '/designer')}>Enter Store</button>
    `;
  }
}

customElements.define('home-landing', HomeLanding);
