import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class LabelMore extends PolymerElement {
  static get template() {
    return html`
      <style>
        /* shadow DOM styles go here */
        :host {
          width: 100%;
        }
        #fadecontainer{
          position: relative;
        }
        
        #fadecontent{
          max-height: 120px;
          position: relative;
          overflow: hidden;
        }    
        div#fadecontent.full{
          max-height: none;
        }
    
        .fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          
          background-image: linear-gradient(to top, lightgrey, transparent);
        }
    
        .fade-anchor-text {
          
          font-size: 17px;
          font-family: Georgia,serif;
          text-decoration: none;
          vertical-align: middle;
          color: #868e96;
        }
      </style>
  
      <!-- shadow DOM goes here -->
      <div>
        <div id="fadecontainer">
          <div id="fadecontent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>
          <div id='fade' class="fade">&nbsp;</div>
        </div>
        <span id="editor" class="fade-anchor-text editor">{{readmorecaption}}</span>
      </div>
    `;
  }
  static get properties() {
    return {
      expanded: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },
      readmorecaption: {
        type: String,
        value: 'Read more',
        reflectToAttribute: true
      },
      content: {
        type: String,
        value: '',
      }
    };
  }

  constructor() {
    super();
    
  }
  ready() {
    super.ready();
    this.$.editor.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    console.log("expanded:");
    this.expanded = !this.expanded;
    console.log(this.expanded);

    console.log(this.$.fadecontent);
    /*this.$.fadecontent.style.maxHeight="none";*/
    if(this.expanded) {
      this.$.fadecontent.classList.add("full");
      this.$.fade.classList.remove("fade");
    }else {
      this.$.fadecontent.classList.remove("full");
      this.$.fade.classList.add("fade");
    }
    
  }
}

customElements.define('label-more', LabelMore);
