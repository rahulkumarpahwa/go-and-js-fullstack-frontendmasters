import { API } from "../services/api.js";
import { MovieItem } from "./MovieItem.js";

export class SimilarMovies extends HTMLElement {
  constructor(movie_id) {
    super();
    this.movie_id = movie_id;
    this.movies = null;
  }

  async render() {
    try {
      this.movies = await API.getSimilarMovies(this.movie_id);
    } catch (error) {
      console.log(error);
    }
    const ul = this.querySelector("#similar-movies");
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
    const template = document.getElementById("template-similar-movies");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }
}

customElements.define("similar-movies", SimilarMovies);
