import { HomePage } from "../components/HomePage";
import { MovieDetailsPage } from "../components/MovieDetailsPage";
import { MoviePage } from "../components/MoviePage";

export const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: /\/movies\/(\d+)/,   // this is the regular expression where after the keyowrd /movies/66 any number will be there which can be read by this.
    component: MovieDetailsPage,
  },
  {
    path: "/movies", // for search results, we will create later.
    component: MoviePage,
  },
];
