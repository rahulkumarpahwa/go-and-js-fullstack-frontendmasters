export class LoadingWave extends HTMLElement {
  constructor() {
    // NOTE : don't use the contrsuctor to get the attribute value as it will called just creating the element extended and attributes will be parsed later. so, use the connectedCallback to get that.
    super(); // must and first
  }

  // Every data-attribute goes to a property of that object dataset without data dash.
  connectedCallback() {
    const elements = this.dataset.elements; //data-elements
    let height = this.dataset.height;
    let width = this.dataset.width;

    for (let i = 0; i < elements; i++) {
      const wrapper = document.createElement("div");
      wrapper.classList.add("loading-wave");
      wrapper.style.height = height;
      wrapper.style.width = width;
      wrapper.style.margin = "10px";
      wrapper.style.display = "inline-block";
      this.appendChild(wrapper);
    }
  }
}

customElements.define("loading-wave", LoadingWave);
