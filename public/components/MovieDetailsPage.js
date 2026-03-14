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


  }

  //NOTE : this method will called once the code is parsed and mounted and WILL NOT BE CALLED AGAIN WHEN THE ATTRIBUTE CHANGES.
  connectedCallback() {
    this.render();
  }
}

customElements.define("movie-details-page", MovieDetailsPage);
