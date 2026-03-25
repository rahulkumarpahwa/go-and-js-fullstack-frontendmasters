import { API } from "../services/api.js";
import { MovieItem } from "./MovieItem.js";

export class ActorPage extends HTMLElement {
  constructor() {
    super();
    this.id = null;
  }

  async render() {
    const data = API.getActorDetails(this.id);
    const actor = data?.actor;
    const movies = data?.movies ?? [];

    const div = document.querySelector("#actor-result");
    div.innerHTML 

    const ul = document.querySelector("#actor-movies-result");

    if (movies && movies.length > 0) {
      ul.innerHTML = "";
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.appendChild(new MovieItem(movie));
      });
      this.appendChild(ul);
    }
  }

  connectedCallback() {
    const template = document.getElementById("template-actor-details");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    this.render();
    this.id = this.params[0];
  }
}

customElements.define("actor-page", ActorPage);
