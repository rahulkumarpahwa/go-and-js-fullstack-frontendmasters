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

	// Initialise the Account Repository for Users
	accountRepository, err := data.NewAccountRepository(db, logInstance)
	if err != nil {
		log.Fatal("Failed to create the Account Respository", err)
	}

	
	
	// movie handler instance
	movieHandler := handlers.MovieHandler{Logger: logInstance, Storage: movieRepository}
	server.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)
	server.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	// http://localhost:8080/api/movies/search?name="apple"&order="DESC"&genre="1"
	server.HandleFunc("/api/movies/search", movieHandler.SearchMoviesByName)
	server.HandleFunc("/api/movies/", movieHandler.GetMovieById)
	server.HandleFunc("/api/genres", movieHandler.GetTopGenres)
	
	accountHandler := handlers.AccountHandler{Logger: logInstance, Storage: accountRepository}
	server.HandleFunc("/api/acount/register", accountHandler.Register)
	server.HandleFunc("/api/account/auth", accountHandler.Authenticate)

	catchAllClientRoutesHandler := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/index.html")
	}

	// handling the client routes:
	server.HandleFunc("/movies", catchAllClientRoutesHandler)
	server.HandleFunc("/movies/", catchAllClientRoutesHandler)

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
