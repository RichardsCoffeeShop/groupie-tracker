package main

import (
	"fmt"
	"groupie/controller"
	"net/http"
)

func main() {
	server := http.NewServeMux()

	server.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("static"))))
	server.HandleFunc("/", controller.LoadMainPage)
	server.HandleFunc("/band", controller.LoadBandPage)
	server.HandleFunc("/api", controller.ParseApiData)

	fmt.Println(`Succesfully started server at localhost:8080`)
	http.ListenAndServe(":8080", server)
}
