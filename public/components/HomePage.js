import { API } from "../services/api.js"; // always add the .js at the end.
import { MovieItem } from "./MovieItem.js";

export class HomePage extends HTMLElement {
  constructor() {
    super(); // must call this
  }

  // custom method not the one given by the HTMLElement class
  async render() {
    const topMovies = await API.getTopMovies();
    renderMoviesInList(
      topMovies,
      document.getElementById("top-10").children[1],
    );

    const randomMovies = await API.getRandomMovies();
    renderMoviesInList(
      randomMovies,
      document.getElementById("random").children[1],
    );

    function renderMoviesInList(movies, ul) {
      ul.innerHTML = "";
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.appendChild(new MovieItem(movie));
        ul.appendChild(li);
      });
    }
  }

  // this method will be called when element (here home-page) is pushed into the dom, then will be called. It is like the event, like mounted event over our element.
  // Given by HTMLElement class, which we need to override.
  connectedCallback() {
    const template = document.getElementById("template-home");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.render();
  }
}

customElements.define("home-page", HomePage);
// NOTE : when we define a new custom html elemnet, then it must have the - (hyphen) in it.
