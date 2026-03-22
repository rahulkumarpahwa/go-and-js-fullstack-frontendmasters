export class LoginPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("template-login");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("login-page", LoginPage);
