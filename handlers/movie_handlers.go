package handlers

import (
	"encoding/json"
	"net/http"

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
	w.Header().Set("content-type", "application/json")

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
	}
	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := h.Storage.GetRandomMovies()
	if err != nil {
		h.Logger.Error("Get Random Movies Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetTopGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := h.Storage.GetAllGenres()

	if err != nil {
		h.Logger.Error("Get Top Genres Not found error ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	h.writeJSONResponse(w, genres)
}
