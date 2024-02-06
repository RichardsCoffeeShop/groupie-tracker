package repository

import (
	"encoding/json"
	"fmt"
	"groupie/entity"
	"net/http"
)

func GetRelationsData(api string) []entity.Relations {
	var relationsData entity.RelationsData
	res2, err := http.Get(api)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	err = json.NewDecoder(res2.Body).Decode(&relationsData)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	// Create a slice to store the extracted Locations
	var relations []entity.Relations

	// Iterate through relationsData.Index and extract the data
	for _, locationData := range relationsData.Index {
		relations = append(relations, entity.Relations{
			ID:             locationData.ID,
			DatesLocations: locationData.DatesLocations,
		})
	}

	return relations
}
