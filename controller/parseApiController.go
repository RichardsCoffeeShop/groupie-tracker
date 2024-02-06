package controller

import (
	"encoding/json"
	"groupie/entity"
	"groupie/repository"
	"net/http"
)

var locations []entity.Locations
var artists []entity.Artist
var dates []entity.Dates
var relations []entity.Relations

func ParseApiData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var data = make(map[string]interface{})

	artists = repository.GetArtist("https://groupietrackers.herokuapp.com/api/artists")
	locations = repository.GetLocationsData("https://groupietrackers.herokuapp.com/api/locations")
	dates = repository.GetDatesData("https://groupietrackers.herokuapp.com/api/dates")
	relations = repository.GetRelationsData("https://groupietrackers.herokuapp.com/api/relation")

	data["artists"] = artists
	data["locations"] = locations
	data["dates"] = dates
	data["relations"] = relations
	json.NewEncoder(w).Encode(data)
}
