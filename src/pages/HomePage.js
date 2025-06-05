import { LitElement, html, css } from 'lit';
import '../components/RepeatingTransition.js';

customElements.define('home-page', class extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      min-height: 100vh;
      overflow: hidden;
    }

    repeating-transition {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 50px;
      color: white;
    }

    button {
      font-size: 24px;
      margin: 20px;
      padding: 10px 20px;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <repeating-transition></repeating-transition>
      <div class="container">
        <h1>Welcome to My POD Store</h1>
        <p>Select clothing type:</p>
        <button @click=${() => this.navigate('tshirt')}>T-Shirt 👕</button>
        <button @click=${() => this.navigate('hoodie')}>Hoodie 🧥</button>
        <button @click=${() => this.navigate('cap')}>Cap 🧢</button>
        <button @click=${() => this.navigate('shirt')}>Shirt 👔</button>
      </div>
    `;
  }

  navigate(type) {
    localStorage.setItem('selectedClothing', type);
    history.pushState(null, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
});
