package controller

import (
	"net/http"
	"html/template"
)

func LoadBandPage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Query().Get("id") == "" {
		w.WriteHeader(404)
		w.Write([]byte("Error 404. Page not found."))
		return
	}

	tmpl := template.Must(template.ParseFiles("./static/pages/band.html"))
	tmpl.Execute(w, nil)
}