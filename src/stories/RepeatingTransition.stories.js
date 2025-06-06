import { html } from 'lit';
import '../components/RepeatingTransition.js'; // or whatever filename you used

export default {
  title: 'Pages/HomeAnimation',
  component: 'repeating-transition',
};

export const Default = () => html`<repeating-transition></repeating-transition>`;
