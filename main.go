package main

import (
	"log"
	"net/http"
)

func main() {
	const address string = ":8080" // we will put this later in the env file.

	server := http.NewServeMux()

	// we are serving the static files such as the images, css and json file.
	server.Handle("/", http.FileServer(http.Dir("./public")))

	err := http.ListenAndServe(address, server)

	if err != nil {
		log.Fatalf("Server Failed : %v", err)
	}

}
