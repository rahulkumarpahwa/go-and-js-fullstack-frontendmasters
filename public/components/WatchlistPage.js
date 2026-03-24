import { API } from "../services/api.js";
import { CollectionPage } from "./CollectionPage.js";

export default class WatchlistPage extends CollectionPage {
  constructor() {
    super(API.getWatchlist, "Movie Watchlist", "watchlist");
  }
}
customElements.define("watchlist-page", WatchlistPage);
