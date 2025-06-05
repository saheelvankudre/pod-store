import { LitElement, html, css } from 'lit';

class RepeatingTransition extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      animation: fadeInOut 8s infinite;
    }

    .frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .frame:nth-child(1) { animation-delay: 0s; }
    .frame:nth-child(2) { animation-delay: 2s; }
    .frame:nth-child(3) { animation-delay: 4s; }
    .frame:nth-child(4) { animation-delay: 6s; }

    @keyframes fadeInOut {
      0% { opacity: 0; }
      10% { opacity: 1; }
      40% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 0; }
    }
  `;

  render() {
    return html`
      <div class="frame"><img src="/images/tshirt.jpg" alt="T-Shirt"></div>
      <div class="frame"><img src="/images/hoodie.jpg" alt="Hoodie"></div>
      <div class="frame"><img src="/images/cap.jpg" alt="Cap"></div>
      <div class="frame"><img src="/images/shirt.jpg" alt="Shirt"></div>
    `;
  }
}

customElements.define('repeating-transition', RepeatingTransition);
