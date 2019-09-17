/**
Copyright (c) 2019 BKB. All rights reserved.
This code may only be used under the BSD-3-Clause license found at
https://opensource.org/licenses/BSD-3-Clause
author: BKB
contact: https://github.com/berndklb
 */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class LabelMore extends PolymerElement {
  static get template() {
    return html`
      <style>
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
          background: linear-gradient(rgba(255, 255, 255, 0) 0%, var(--radiant-background-color) 100%);
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
        <span id="readmore" class="fade-anchor-text">{{readmorecaption}}</span>
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
      readlesscaption: {
          type: String,
          value: 'Read less',
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
    window.addEventListener("resize", this.resizeWindow.bind(this));

    this.$.readmore.classList.add(this.isOverflown(this.$.fadecontent) ? "overflowed" : "fits");  

    this.adjustHeight();
  }

  resizeWindow() {
    if(this.isOverflown(this.$.fadecontent)) {
      this.$.readmore.classList.remove("fits");
      this.$.readmore.classList.add("overflowed");
    } else {
      this.$.readmore.classList.remove("overflowed");
      this.$.readmore.classList.add("fits");
    }
    
    this.adjustHeight();
  }

  toggle() {
    this.expanded = !this.expanded;
    this.adjustHeight();
  }

  adjustHeight(){
    if(this.expanded) {
      this.$.fadecontent.classList.add("full");
      this.$.fade.classList.add("full");
      this.$.fadecontent.style.maxHeight = 'none';
      this.$.readmore.textContent = this.readlesscaption;
    }else {
      this.$.fadecontent.classList.remove("full");
      this.$.fade.classList.remove("full");
      this.$.fadecontent.style.maxHeight = this.contentheight+'px';
      this.$.readmore.textContent = this.readmorecaption;
    }
  }
  
  isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
}

customElements.define('label-more', LabelMore);
