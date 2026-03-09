package main

import (
	"log"
	"net/http"

	"rahulkumarpahwa.me/go-and-js-fullstack/handlers"
	"rahulkumarpahwa.me/go-and-js-fullstack/logger"
)

func initialiseLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie-service.log")
	if err != nil {
		log.Fatalf("Failed to initialise logger : %v", err)
	}
	return logInstance
}

func main() {
	var logInstance *logger.Logger = initialiseLogger()

	const address string = ":8080" // we will put this later in the env file.

	server := http.NewServeMux()

	movieHandler := handlers.MovieHandler{}
	server.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)

	server.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)

	// we are serving the static files such as the images, css and json file. This should be last route.
	server.Handle("/", http.FileServer(http.Dir("./public")))

	logInstance.Info("Server Starting on port " + address)
	err := http.ListenAndServe(address, server)

	if err != nil {
		logInstance.Error("Server failed to start ", err)
		log.Fatalf("Server Failed : %v", err)
	}

}
