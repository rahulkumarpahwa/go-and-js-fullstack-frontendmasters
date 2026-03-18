// import { HomePage } from "./components/HomePage.js";
import { API } from "./services/api.js";
import "./components/HomePage.js";
import "./components/LoadingWave.js";
import "./components/MovieDetailsPage.js";
import "./components/YoutubeEmbed.js";
import { Router } from "./services/Router.js";
// import { HomePage } from "./components/HomePage.js";

// window.addEventListener("DOMContentLoaded", (event) => {
//   document.querySelector("main").appendChild(new HomePage());
// });

window.addEventListener("DOMContentLoaded", (event) => {
  Router.init();
});

window.app = {
  search: (event) => {
    event.preventDefault();
    const q = document.querySelector("input[type='search']").value;
    Router.go("/movies?name=" + q);
  },
  api: API,
  Router,
  showError: (message = "there is some Error", goToHome = true) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) {
      Router.go("/");
    }
  },

  closeError: () => {
    document.getElementById("alert-modal").close();
  },
};

const modal = document.getElementById("alert-modal");
modal.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    console.log("Escape Key Pressed!");

    app.closeError();
  }
});
