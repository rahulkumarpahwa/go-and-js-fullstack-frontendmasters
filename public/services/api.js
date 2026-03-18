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
  searchMovies: async (name, order = "", genre = "") => {
    console.log(name, order, genre);

    return await API.fetch(`movies/search`, { name, order, genre });
  },
  getGenres: async () => {
    return await API.fetch("genres");
  },

  fetch: async (ServiceWorker, args) => {
    try {
      const queryString = args ? new URLSearchParams(args).toString() : "";
      console.log(queryString);

      const response = await fetch(
        API.baseURL + ServiceWorker + "?" + queryString,
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
