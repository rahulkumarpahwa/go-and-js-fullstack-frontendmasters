package data

import (
	"database/sql"

	"rahulkumarpahwa.me/go-and-js-fullstack/logger"
	"rahulkumarpahwa.me/go-and-js-fullstack/models"
)

type ActorRepositary struct {
	db     *sql.DB
	logger *logger.Logger
}

func (a *ActorRepositary) GetActorDetails(id int) (models.Actor, []models.Movie, error) {
	query := `SELECT id, first_name, last_name, image_url FROM actors WHERE id=$1`

	row := a.db.QueryRow(query, id)
	var actor models.Actor
	err := row.Scan(&actor.ID, &actor.FirstName, &actor.LastName, &actor.ImageURL)
	if err != nil {
		a.logger.Error("Unable to Scan the actor Row :", err)
		return models.Actor{}, []models.Movie{}, err
	}

	// find the movies related to the actor
	query = `SELECT movies.id, movies.title, movies.release_year, movies.poster_url FROM movie_cast JOIN movies ON movie_cast.movie_id = movies.id WHERE movie_cast.actor_id = $1`

	rows,err := a.db.Query(query, id)
	if err != nil {
		a.logger.Error("Unable to get the movies for actors :", err)
		return models.Actor{}, []models.Movie{}, err
	}
	var movies []models.Movie
	



	return models.Actor{}, []models.Movie{}, nil
}
