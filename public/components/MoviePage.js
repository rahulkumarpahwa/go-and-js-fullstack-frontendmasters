export class MoviePage extends HTMLElement {
  constructor(query) {
    super();
    this.query = query;
  }

  async render(){
        

  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("movie-page", MoviePage);
