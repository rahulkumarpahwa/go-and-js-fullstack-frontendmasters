package models

type Movie struct {
	ID          int
	TMBD_ID     int
	Title       string
	Tagline     string
	ReleaseYear int
	Genre       []Genre
	Score       *float32
	Popularity  *float32
	Keywords    []string
	Language    *string
	PosterURL   *string
	TrailerURL  *string
	Casting     []Actor
}
