import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class LabelMore extends PolymerElement {
  static get template() {
    return html`
      <style>
        /* shadow DOM styles go here */
        
        
        #fadecontainer {
          position: relative;
        }
        
        #fadecontent{
          position: relative;
          overflow: hidden;
        }    
        #fadecontent.full{
          max-height: auto;
        }
    
        .fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding-top: 15px;
          /*background-image: linear-gradient(to top, lightgrey, transparent);*/
          background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
        }

        .fade.full {
          visibility: hidden;
        }
    
        .fade-anchor-text {
          text-decoration: none;
          vertical-align: middle;
          color: #868e96;
          color: var(--read-more-color);
        }
        .fade-anchor-text:hover {
          cursor: pointer;
        }
        .fade-anchor-text.overflowed {
          visibility: visible;
        }
        .fade-anchor-text.fits {
          visibility: hidden;
        }
      </style>
  
      <!-- shadow DOM goes here -->
      <div>
        <div id="fadecontainer">
          <div id="fadecontent" style="max-height: {{contentheight}}px"><slot></slot></div>
          <div id='fade' class="fade">&nbsp;</div>
        </div>
        <span id="readmore" class="fade-anchor-text readmore">{{readmorecaption}}</span>
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
      contentheight: {
        type: Number,
        value: 60,
        reflectToAttribute: true,
        notify: true
      }
    };
  }

  constructor() {
    super();
    
  }
  ready() {
    super.ready();
    this.$.readmore.addEventListener('click', this.toggle.bind(this));
    this.$.readmore.classList.add(this.isOverflown(this.$.fadecontent) ? "overflowed" : "fits");
    this.$
    if(this.isOverflown(this.$.fadecontent)) {
      this.$.fadecontent.classList.remove("full");
      this.$.fade.classList.remove("full");
    }else {
      this.$.fadecontent.classList.add("full");
      this.$.fade.classList.add("full");
    }
    
  }

  toggle() {
    this.expanded = !this.expanded;

    if(this.expanded) {
      this.$.fadecontent.classList.add("full");
      this.$.fade.classList.add("full");
      this.$.fadecontent.style.maxHeight = 'none';
    }else {
      this.$.fadecontent.classList.remove("full");
      this.$.fade.classList.remove("full");
      this.$.fadecontent.style.maxHeight = this.contentheight+'px';
    }
  }

  isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
}

customElements.define('label-more', LabelMore);
