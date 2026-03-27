const Store = {
  jwt: null,
  get loggedIn() {
    return this.jwt !== null;
  },
  favorites: [],
  watchlist: [],
  removeFromWatchlist: (value) => {
    if (value != null) {
      const newList = proxiedStore.watchlist.filter((v) => v !== value);
      proxiedStore.watchlist = newList;
    }
    return true;
  },
  removeFromFavorites: (value) => {
    if (value != null) {
      const newList = proxiedStore.favorites.filter((v) => v !== value);
      proxiedStore.favorites = newList;
    }
    return true;
  },
};

if (localStorage.getItem("jwt")) {
  Store.jwt = localStorage.getItem("jwt");
}

export const proxiedStore = new Proxy(Store, {
  set: (target, prop, value) => {
    if (prop == "jwt") {
      target[prop] = value;
      if (value == null) {
        localStorage.removeItem("jwt");
      } else {
        localStorage.setItem("jwt", value);
      }
    } else if (prop === "watchlist" || prop === "favorites") {
      if (Array.isArray(value)) {
        target[prop] = value;
      } else {
        target[prop] = [...target[prop], value];
      }
      return true;
    }
  },
});
