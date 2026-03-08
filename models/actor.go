package models

type Actor struct{
	ID int
	FirstName string
	LastName string
	ImageURL *string //nullable, beacuse not the image of all is available
}