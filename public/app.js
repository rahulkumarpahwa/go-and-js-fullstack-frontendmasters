// import { HomePage } from "./components/HomePage.js";
import { API } from "./services/api.js";
import "./components/HomePage.js";
import "./components/LoadingWave.js";
import "./components/MovieDetailsPage.js";
import "./components/YoutubeEmbed.js";
import { Router } from "./services/Router.js";
import { proxiedStore } from "./services/Store.js";
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
  Store: proxiedStore,
  showError: (message = "there is some Error", goToHome = false) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) {
      Router.go("/");
    }
  },

  closeError: () => {
    document.getElementById("alert-modal").close();
  },
  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const genre = urlParams.get("genre") ?? "";
    app.Router.go(`/movies?name=${name}&order=${order}&genre=${genre}`);
  },
  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const order = urlParams.get("order") ?? "";
    app.Router.go(`/movies?name=${name}&order=${order}&genre=${genre}`);
  },

  register: async (event) => {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const passwordConfirmation = document.getElementById(
      "register-password-confirm",
    ).value;

    const errors = [];
    if (name.length < 4) errors.push("Enter your Complete Name!");
    if (password.length < 7)
      errors.push("Enter a password with at least 7 characters!");
    if (email.length < 4) errors.push("Enter your Complete Email!");
    if (password !== passwordConfirmation)
      errors.push("Passwords don't match!");

    if (errors.length == 0) {
      const response = await API.register(name, email, password);
      if (response.success === true) {
        window.app.Store.jwt = response.jwt;
        Router.go("/account/");
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join("\n"));
    }
  },
  login: async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const errors = [];
    if (password.length < 7)
      errors.push("Enter a password with at least 7 characters!");
    if (email.length < 4) errors.push("Enter your Complete Email!");

    if (errors.length == 0) {
      const response = await API.login(email, password);
      if (response.success) {
        window.app.Store.jwt = response.jwt;
        Router.go("/account/");
      } else {
        app.showError(response.message);
      }
    } else {
      app.showError(errors.join("\n"));
    }
  },
};

const modal = document.getElementById("alert-modal");
modal.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    console.log("Escape Key Pressed!");

    app.closeError();
  }
});
