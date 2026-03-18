import { API } from "../services/api.js";

export class MoviePage extends HTMLElement {
  constructor() {
    super();
    this.movies = null;
  }

  async render() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const movies = await API.searchMovies(searchParams.get("name"));
      this.movies = movies;
    } catch (error) {
      console.log(error);
      alert("Movie does not Exist!");
      return;
    }

    const movieDetailsTemplate = document.getElementById(
      "template-movie-details",
    );

    if (this.movies) {
      this.movies.forEach((movie) => {
        const content = movieDetailsTemplate.content.cloneNode(true);
        content.querySelector("h2").textContent = movie.title;
        content.querySelector("h3").textContent = movie.tagline;
        content.querySelector("img").src = movie.poster_url;
        content.querySelector("#trailer").dataset.url = movie.trailer_url; // we are setting the trailer url after the template is injected in the DOM so we will get it in the connectedCallback to use the value of data-url we set here.
        content.querySelector("#overview").textContent = movie.overview;
        content.querySelector("#metadata").innerHTML = `
        <dt>Release Year</dt>
        <dd>${movie.release_year}</dd>
        <dt>Score</dt>
        <dd>${movie.score} / 10</dd>
        <dt>Popularity</dt>
        <dd>${movie.popularity.toFixed(2)}</dd>
        `;

        const ulGenres = content.querySelector("#genres");
        ulGenres.innerHTML = "";
        if (movie.genres) {
          movie.genres.forEach((genre) => {
            const li = document.createElement("li");
            li.textContent = genre.name;
            ulGenres.appendChild(li);
          });
        }

        const ulCast = content.querySelector("#cast");
        ulCast.innerHTML = "";
        if (movie.casting) {
          movie.casting.forEach((actor) => {
            const li = document.createElement("li");
            li.innerHTML = `
         <img src="${actor.image_url ?? "/images/generic_actor.jpg"}" alt="Picture of  ${actor.first_name} ${actor.last_name}" />
        <p>${actor.first_name} ${actor.last_name}</p>
        `;
            ulCast.appendChild(li);
          });
        }

        this.appendChild(content);
      });
    } else {
      window.app.showError("Movies Can't be Found!");
      document.querySelector("input[type='search']").value = "";
      // const h1 = document.createElement("h1");
      // h1.textContent = "Movies Can't be Found!";
      // this.appendChild(h1);
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("movie-page", MoviePage);
