import { html } from 'lit';
import '../components/TShirtViewer.js';

export default {
  title: 'Components/TShirtViewer',
  component: 'tshirt-viewer',
};

export const Default = () =>
  html`<tshirt-viewer model-url="/models/tshirt.glb"></tshirt-viewer>`;
