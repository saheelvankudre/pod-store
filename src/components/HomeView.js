import { LitElement, html, css } from 'lit';
import './RepeatingTransition.js';

class HomeView extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      position: relative;
      font-family: sans-serif;
    }

    .ui-overlay {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    .clothing-options {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .option {
      background: white;
      color: black;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s, background 0.2s;
    }

    .option:hover {
      background: #eee;
      transform: scale(1.05);
    }

    .start-btn {
      padding: 1rem 2rem;
      background: #ff4081;
      border: none;
      color: white;
      border-radius: 8px;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .start-btn:hover {
      background: #e73370;
    }
  `;

  static properties = {
    selectedClothing: { type: String },
  };

  constructor() {
    super();
    this.selectedClothing = '';
  }

  selectClothing(type) {
    this.selectedClothing = type;
    const transition = this.shadowRoot.querySelector('repeating-transition');
    transition?.setImage(`/images/${type}.jpg`);
  }

  start() {
    if (!this.selectedClothing) {
      alert('Please select a clothing type.');
      return;
    }
    localStorage.setItem('selectedClothing', this.selectedClothing);
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <repeating-transition></repeating-transition>
      <div class="ui-overlay">
        <h1>Choose Your Clothing</h1>
        <div class="clothing-options">
          <button class="option" @click="${() => this.selectClothing('tshirt')}">T-Shirt 👕</button>
          <button class="option" @click="${() => this.selectClothing('hoodie')}">Hoodie 🧥</button>
          <button class="option" @click="${() => this.selectClothing('shirt')}">Shirt 👔</button>
          <button class="option" @click="${() => this.selectClothing('cap')}">Cap 🧢</button>
        </div>
        <button class="start-btn" @click="${this.start}">Start Customizing</button>
      </div>
    `;
  }
}

customElements.define('home-view', HomeView);
