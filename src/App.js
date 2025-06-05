import { LitElement, html } from 'lit';
import { Router } from '@lit-labs/router';
import './components/HomeView.js';
import './components/CustomizerView.js';
import './pages/CustomizePage.js';
import './pages/DesignerPage.js';

document.querySelector('#app').innerHTML = `
  <home-view></home-view>
`;

export class AppRoot extends LitElement {
  constructor() {
    super();
    this.router = new Router(this, [
      { path: '/', render: () => html`<home-view></home-view>` },
      { path: '/customize', render: () => html`<customizer-view></customizer-view>` },
    ]);
  }

  render() {
    return html`${this.router.outlet()}`;
  }
}

customElements.define('app-root', AppRoot);
