// src/components/MyElement.js
import { LitElement, html } from 'lit';

customElements.define('my-element', class extends LitElement {
  render() {
    return html`<p>Loading My POD Store...</p>`;
  }
});
