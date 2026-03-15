import { API } from "../services/api.js"; // always put the js in the end.

export class MovieDetailsPage extends HTMLElement {
  constructor(id) {
    super(); // must and first
    this.movie = null;
    this.id = id || 12;
  }

  async render() {
    try {
      this.movie = await API.getMovieById(this.id);
    } catch (error) {
      console.log(error);
      alert("Movie does not Exist!");
      return;
    }

    const movieDetailsTemplate = document.getElementById(
      "template-movie-details",
    );
    const content = movieDetailsTemplate.content.cloneNode(true);
    this.appendChild(content);

    this.querySelector("h2").textContent = this.movie.title;
    this.querySelector("h3").textContent = this.movie.tagline;
    this.querySelector("img").src = this.movie.poster_url;
    this.querySelector("#trailer").dataset.url = this.movie.trailer_url; // we are setting the trailer url after the template is injected in the DOM so we will get it in the connectedCallback to use the value of data-url we set here.
    this.querySelector("#overview").textContent = this.movie.overview;
    this.querySelector("#metadata").innerHTML = `
    <dt>Release Year</dt>
    <dd>${this.movie.release_year}</dd>
    <dt>Score</dt>
    <dd>${this.movie.score} / 10</dd>
    <dt>Popularity</dt>
    <dd>${this.movie.popularity.toFixed(2)}</dd>
    `;

    const ulGenres = this.querySelector("#genres");
    ulGenres.innerHTML = "";
    this.movie.genres.forEach((genre) => {
      const li = document.createElement("li");
      li.textContent = genre.name;
      ulGenres.appendChild(li);
    });

    const ulCast = this.querySelector("#cast");
    ulCast.innerHTML = "";
    this.movie.casting.forEach((actor) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <img src="${actor.image_url ?? "/images/generic_actor.jpg"}" alt="Picture of  ${actor.first_name} ${actor.last_name}" />
      <p>${actor.first_name} ${actor.last_name}</p>
      `;
      ulCast.appendChild(li);
    });
  }

  //NOTE : this method will called once the code is parsed and mounted and WILL NOT BE CALLED AGAIN WHEN THE ATTRIBUTE CHANGES.
  connectedCallback() {
    this.render();
  }
}

customElements.define("movie-details-page", MovieDetailsPage);
