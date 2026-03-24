export class DeleteButton extends HTMLElement {
  constructor(movie, collection) {
    super();
    this.movie = movie;
    this.collection = collection;
  }

  connectedCallback() {
    this.innerHTML = `<button title="Remove ${this.movie.title}" class="collection-delete-button" onclick="app.removeFromCollection(${this.movie.id}, '${this.collection}')" >X</button>`;
  }
}

customElements.define("delete-button", DeleteButton);
