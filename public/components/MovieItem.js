export class MovieItem extends HTMLElement {
  constructor(movie) {
    super(); // must do it and first do it
    this.movie = movie;
  }

  /**
   - this will be called after the DOM will be parsed. this is like mounting the component.
   */
  connectedCallback() {
    const url = "/movies/" + this.movie.id;
    this.innerHTML = `<a onclick="app.Router.go('${url}')"><article>
                    <img src="${this.movie.poster_url}" alt="${this.movie.title} Poster"/>
                    <p>${this.movie.title}  ${this.movie.release_year}</p>
        </article></a>`;
  }
}

customElements.define("movie-item", MovieItem);
