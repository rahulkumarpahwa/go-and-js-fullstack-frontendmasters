import { DeleteButton } from "./DeleteButton.js";
import { MovieItem } from "./MovieItem.js";

export class CollectionPage extends HTMLElement {
  constructor(endpoint, title, collection) {
    super();
    this.endpoint = endpoint;
    this.title = title;
    this.collection = collection;
  }

  async render() {
    const movies = await this.endpoint();
    const ulMovies = this.querySelector("ul");
    ulMovies.innerHTML = "";
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.style =
          "display: flex; flex-direction: column-reverse; justify-content:center; align-items:flex-end; gap:2px";
        li.appendChild(new MovieItem(movie));
        li.appendChild(new DeleteButton(movie, this.collection));
        ulMovies.appendChild(li);
      });
    } else {
      ulMovies.innerHTML = "<h3>There are no movies</h3>";
    }
  }

  connectedCallback() {
    const template = document.getElementById("template-collection");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }
}
