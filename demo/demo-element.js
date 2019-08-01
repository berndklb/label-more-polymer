import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../label-more.js';

class DemoElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          font-family: sans-serif;
        }
      </style>
      
      <label-more readmorecaption="Read more"></label-more>
    `;
  }
}
customElements.define('demo-element', DemoElement);
