package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"rahulkumarpahwa.me/go-and-js-fullstack/data"
	"rahulkumarpahwa.me/go-and-js-fullstack/handlers"
	"rahulkumarpahwa.me/go-and-js-fullstack/logger"

	_ "github.com/jackc/pgx/v5/stdlib" // special kind of import for the drivers
)

func initialiseLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie-service.log")
	if err != nil {
		log.Fatalf("Failed to initialise logger : %v", err)
	}
	return logInstance
}

func main() {
	server := http.NewServeMux()

	// logger instance
	var logInstance *logger.Logger = initialiseLogger()

	// Environment Variables instance
	if err := godotenv.Load(); err != nil {
		log.Fatalf("No .env file was found!")
	}

	//DB connection
	dbConnStr := os.Getenv("DB_URL")
	if dbConnStr == "" {
		log.Fatal("Database URL not set!")
	}

	db, err := sql.Open("pgx", dbConnStr)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Initailise the Data Repository for Movies
	movieRepository, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatal("Failed to create the Movie Respository", err)
	}

	// movie handler instance
	movieHandler := handlers.MovieHandler{Logger: logInstance, MovieRepository: movieRepository}
	server.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	server.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	server.HandleFunc("/api/genres/top", movieHandler.GetTopGenres)

	// we are serving the static files such as the images, css and json file. This should be last route.
	server.Handle("/", http.FileServer(http.Dir("./public")))

	const address string = ":8080" // we will put this later in the env file.
	logInstance.Info("Server Starting on port " + address)

	// Listener instance
	err = http.ListenAndServe(address, server)

	if err != nil {
		logInstance.Error("Server failed to start ", err)
		log.Fatalf("Server Failed : %v", err)
	}

}
