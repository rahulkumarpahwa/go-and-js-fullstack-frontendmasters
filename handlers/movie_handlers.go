package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"rahulkumarpahwa.me/go-and-js-fullstack/data"
	"rahulkumarpahwa.me/go-and-js-fullstack/logger"
	// "rahulkumarpahwa.me/go-and-js-fullstack/models"
)

type MovieHandler struct {
	Logger  *logger.Logger
	Storage data.MovieStorage
}

// we will take it as the helper function which will take data of type any and then write that to the w.
func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.Logger.Error("JSON Enconding error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

}

func (h *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	// movies := []models.Movie{
	// 	{
	// 		ID:          1,
	// 		TMDB_ID:     101,
	// 		Title:       "The Hacker",
	// 		ReleaseYear: 2022,
	// 		Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
	// 		Keywords:    []string{"hacking", "cybercrime"},
	// 		Casting:     []models.Actor{{ID: 1, FirstName: "Jane", LastName: "Doe"}},
	// 	},
	// 	{
	// 		ID:          2,
	// 		TMDB_ID:     102,
	// 		Title:       "Space Dreams",
	// 		ReleaseYear: 2020,
	// 		Genres:      []models.Genre{{ID: 2, Name: "Sci-Fi"}},
	// 		Keywords:    []string{"space", "exploration"},
	// 		Casting:     []models.Actor{{ID: 2, FirstName: "John", LastName: "Star"}},
	// 	},
	// 	{
	// 		ID:          3,
	// 		TMDB_ID:     103,
	// 		Title:       "The Lost City",
	// 		ReleaseYear: 2019,
	// 		Genres:      []models.Genre{{ID: 3, Name: "Adventure"}},
	// 		Keywords:    []string{"jungle", "treasure"},
	// 		Casting:     []models.Actor{{ID: 3, FirstName: "Lara", LastName: "Hunt"}},
	// 	}}

	movies, err := h.Storage.GetTopMovies()
	if err != nil {
		h.Logger.Error("Get Top Movies Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := h.Storage.GetRandomMovies()
	if err != nil {
		h.Logger.Error("Get Random Movies Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetTopGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := h.Storage.GetAllGenres()

	if err != nil {
		h.Logger.Error("Get Top Genres Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.writeJSONResponse(w, genres)
}

func (h *MovieHandler) GetMovieById(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/api/movies/"):]
	id_num, err := strconv.Atoi(idStr)

	if err != nil {
		h.Logger.Error("Error in the id Conversion to Int ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	movie, err := h.Storage.GetMovieById(id_num)

	if err != nil {
		h.Logger.Error("Get Movies By ID Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.writeJSONResponse(w, movie)

}

func (h *MovieHandler) SearchMoviesByName(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	order := r.URL.Query().Get("order")
	genre_id := r.URL.Query().Get("genre")

	var genre_id_pointer *int
	if genre_id != "" {
		genre_id_num, err := strconv.Atoi(genre_id)
		if err != nil {
			h.Logger.Error("Error in the genre id Conversion to Int ", err)
			http.Error(w, "invalid genre id", http.StatusBadRequest)
			return
		}
		genre_id_pointer = &genre_id_num

	}

	movies, err := h.Storage.SearchMoviesByName(name, order, genre_id_pointer)

	if err != nil {
		h.Logger.Error("Searched Movies Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	h.writeJSONResponse(w, movies)
}
