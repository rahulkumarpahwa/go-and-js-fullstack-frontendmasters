export class HomePage extends HTMLElement {
  constructor() {
    super(); // must call this
  }

  // this method will be called when element (here home-page) is pushed into the dom, then will be called. It is like the event, like mounted event over our element.
  connectedCallback() {
    const template = document.getElementById("template-home");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("home-page", HomePage);
// NOTE : when we define a new custom html elemnet, then it must have the - (hyphen) in it.
