// import { HomePage } from "./components/HomePage.js";
import { API } from "./services/api.js";
import "./components/HomePage.js";
import "./components/LoadingWave.js";
import "./components/MovieDetailsPage.js";
import "./components/YoutubeEmbed.js";
// import { HomePage } from "./components/HomePage.js";

// window.addEventListener("DOMContentLoaded", (event) => {
//   document.querySelector("main").appendChild(new HomePage());
// });

window.app = {
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type='search']").value;
    // TODO, make the api call here.
  },
  api: API,
};
