import { API } from "../services/api.js";
import { MovieItem } from "./MovieItem.js";

export class MoviePage extends HTMLElement {
  constructor() {
    super();
  }

  async loadGenres() {
    const genres = await API.getGenres();
    const select = document.querySelector("select#filter");
    select.innerHTML = `<option> Filter By Genre</option>`;
    genres.forEach((genre) => {
      let option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      select.appendChild(option);
    });
  }

  async render(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const order = urlParams.get("order") ?? "";
    const genre = urlParams.get("genre") ?? "";

    const movies = await API.searchMovies(name, order, genre);

    const ulMovies = this.querySelector("ul");
    ulMovies.innerHTML = "";
    if (movies && movies.length > 0) {
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.appendChild(new MovieItem(movie));
        ulMovies.appendChild(li);
      });
    } else {
      ulMovies.innerHTML = "<h3>There are no movies with your search</h3>";
    }

    await this.loadGenres();

    if (order) this.querySelector("#order").value = order;
    if (genre) this.querySelector("#filter").value = genre;
  }

  connectedCallback() {
    const template = document.getElementById("template-movies");
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    const searchParams = new URLSearchParams(window.location.search);
    const name = searchParams.get("name");
    if (name) {
      this.querySelector("h2").textContent = ` '${name}' movies`;
      this.render(name);
    } else {
      app.showError();
    }
  }
}

customElements.define("movie-page", MoviePage);
