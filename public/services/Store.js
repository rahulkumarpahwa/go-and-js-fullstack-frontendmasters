const Store = {
  jwt: null,
  get loggedIn() {
    return this.jwt !== null;
  },
  favorites: [],
  watchlist: [],
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
      target[prop] = [...target[prop], value];
    }
    return true;
  },
  removeFromList: (target, prop, value) => {
    if (prop === "watchlist" || prop === "favorites") {
      let newList = target[prop].filter((v) => v !== value);
      target[prop] = newList;
    }
    return true;
  },
});
