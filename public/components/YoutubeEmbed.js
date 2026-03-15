export class YoutubeEmbed extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["data-url"];
  }

  // for this method to work which works on the chnage in attribute we will  need to first set what attribute to observe and for that we will set another method which is get of the observation attribute method
  attributeChangedCallback(prop, value) {
    if (prop === "data-url") {
      const url = this.dataset.url;
      console.log(url);
      const videoId = url.substring(url.indexOf("?v")+ 3);
      this.innerHTML = `<iframe width="100%" height="300" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    }
  }

  connectedCallback() {}
}

customElements.define("youtube-embed", YoutubeEmbed);
