package repository

import (
	"encoding/json"
	"fmt"
	"net/http"

	"groupie/entity"
)

func GetArtist(api string) []entity.Artist {
	var artistData []entity.Artist
	res, err := http.Get(api)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	err = json.NewDecoder(res.Body).Decode(&artistData)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	return artistData
}
