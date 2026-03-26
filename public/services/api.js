export const API = {
  baseURL: "/api/",

  getTopMovies: async () => {
    return await API.fetch("movies/top");
  },
  getRandomMovies: async () => {
    return await API.fetch("movies/random");
  },
  getMovieById: async (id) => {
    return await API.fetch(`movies/${id}`);
  },
  searchMovies: async (name, order, genre) => {
    return await API.fetch(`movies/search`, { name, order, genre });
  },
  getGenres: async () => {
    return await API.fetch("genres");
  },
  register: async (name, email, password) => {
    return await API.send("account/register", { name, email, password });
  },
  login: async (email, password) => {
    return await API.send("account/auth", { email, password });
  },
  getFavorites: async () => {
    return await API.fetch("account/favorites");
  },
  getWatchlist: async () => {
    return await API.fetch("account/watchlist");
  },
  saveToCollection: async (movie_id, collection) => {
    return await API.send("account/save-to-collection", {
      movie_id,
      collection,
    });
  },
  removeFromCollection: async (movie_id, collection) => {
    return await API.send("account/remove-from-collection", {
      movie_id,
      collection,
    });
  },

  getActorDetails: async (actor_id) => {
    return await API.fetch(`actors/${actor_id}`);
  },

  getSimilarMovies: async (movie_id) => {
    return await API.fetch(`movies/similar/${movie_id}`);
  },

  send: async (serviceName, data) => {
    try {
      const response = await fetch(API.baseURL + serviceName, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  fetch: async (ServiceWorker, args) => {
    try {
      const queryString = args ? new URLSearchParams(args).toString() : "";

      const response = await fetch(
        API.baseURL + ServiceWorker + "?" + queryString,
        {
          headers: {
            Authorization: app.Store.jwt ? `Bearer ${app.Store.jwt}` : null,
          },
        },
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
