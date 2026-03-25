export class ActorPage extends HTMLElement {
  constructor() {
    super();
  }

  async render(){
    
  }


  connectedCallback() {
    const template = document.getElementById("template-actor-details")
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    this.render();

  }
}

customElements.define("actor-page", ActorPage);
