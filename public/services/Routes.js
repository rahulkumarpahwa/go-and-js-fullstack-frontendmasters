import { AccountPage } from "../components/AccountPage.js";
import { HomePage } from "../components/HomePage.js";
import { LoginPage } from "../components/LoginPage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js";
import { MoviePage } from "../components/MoviePage.js";
import { RegisterPage } from "../components/RegisterPage.js";

export const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: /\/movies\/(\d+)/, // this is the regular expression where after the keyowrd /movies/66 any number will be there which can be read by this.
    component: MovieDetailsPage,
  },
  {
    path: "/movies", // for search results, we will create later.
    component: MoviePage,
  },
  {
    path: "/account/",
    component: AccountPage,
    loggedIn: true,
  },
  {
    path: "/account/register",
    component: RegisterPage,
  },

  {
    path: "/account/login",
    component: LoginPage,
  },
];
