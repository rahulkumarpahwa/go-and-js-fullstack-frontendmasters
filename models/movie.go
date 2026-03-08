package models

type Movie struct {
	ID          int
	TMDB_ID     int
	Title       string
	Tagline     string
	ReleaseYear int
	Genres       []Genre
	Score       *float32
	Popularity  *float32
	Keywords    []string
	Language    *string
	PosterURL   *string
	TrailerURL  *string
	Casting     []Actor
}
