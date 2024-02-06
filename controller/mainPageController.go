package controller

import (
	"html/template"
	"net/http"
)

func LoadMainPage(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		tmpl := template.Must(template.ParseFiles("./static/notfound.html"))
		tmpl.Execute(w, nil)
		return
	}

	tmpl := template.Must(template.ParseFiles("./static/home.html"))
	tmpl.Execute(w, nil)
}
