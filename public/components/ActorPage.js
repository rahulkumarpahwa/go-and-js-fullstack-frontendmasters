import { API } from "../services/api.js";
import { MovieItem } from "./MovieItem.js";

export class ActorPage extends HTMLElement {
  constructor() {
    super();
    this.id = null;
    this.data = null;
    this.movies = null;
    this.actor = null;
  }

  async render() {
    try {
      this.data = await API.getActorDetails(this.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    this.actor = this.data?.Actor;
    this.movies = this.data?.Movies;

    const div = document.querySelector("#actor-result");
    div.innerHTML = ` <img src="${this.actor.image_url ?? "/images/generic_actor.jpg"}" alt="Picture of  ${this.actor.first_name} ${this.actor.last_name}" />
      <p>${this.actor.first_name} ${this.actor.last_name}</p>`;

    const ul = document.querySelector("#actor-movies-result");

    if (this.movies && this.movies.length > 0) {
      ul.innerHTML = "";
      this.movies.forEach((movie) => {
        const li = document.createElement("li");
        li.appendChild(new MovieItem(movie));
        ul.appendChild(li); 
      });
    }
  }

  connectedCallback() {
    const template = document.getElementById("template-actor-details");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    this.id = this.params[0];
    this.render();
  }
}

customElements.define("actor-page", ActorPage);
