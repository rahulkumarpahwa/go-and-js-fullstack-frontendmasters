package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"rahulkumarpahwa.me/go-and-js-fullstack/data"
	"rahulkumarpahwa.me/go-and-js-fullstack/logger"
	"rahulkumarpahwa.me/go-and-js-fullstack/models"
)

type ActorHandler struct {
	Storage data.ActorStorage
	Logger  *logger.Logger
}

func (h *ActorHandler) GetActorDetails(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/api/actors/"):]
	id_num, err := strconv.Atoi(idStr)

	if err != nil {
		h.Logger.Error("Error in the id Conversion to Int ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	actor, movies, err := h.Storage.GetActorDetails(id_num)
	if err != nil {
		h.Logger.Error("Can't find the actor and movies from GetActor Details", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = json.NewEncoder(w).Encode(struct {
		Actor  models.Actor
		Movies []models.Movie
	}{Actor: actor, Movies: movies})

	if err != nil {
		h.Logger.Error("Can't Encode the data from the json ", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
