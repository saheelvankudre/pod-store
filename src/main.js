// src/main.js
import { html, render } from 'lit';
import './components/MyElement.js';
import './components/HomeView.js';
import './pages/CustomizePage.js';
import './pages/DesignerPage.js';
import './pages/PreviewPage.js';

function navigate(path) {
  history.pushState(null, '', path);
  renderView(path);
}

function renderView(path) {
  let view;
  switch (path) {
    case '/':
      view = html`<home-view></home-view>`;
      break;
    case '/designer':
      view = html`<designer-page></designer-page>`;
      break;
    case '/customize':
      view = html`<customize-page></customize-page>`;
      break;
    case '/preview':
      view = html`<preview-page></preview-page>`;
      break;
    default:
      view = html`<home-view></home-view>`;
  }
  render(view, document.body);
}

window.addEventListener('popstate', () => {
  renderView(location.pathname);
});

// Initial render
renderView(location.pathname);

// Make available to other components
window.navigate = navigate;
