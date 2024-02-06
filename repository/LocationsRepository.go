package repository

import (
	"encoding/json"
	"fmt"
	"net/http"

	"groupie/entity"
)

func GetLocationsData(api string) []entity.Locations {
	var locationsData entity.LocationsData
	res2, err := http.Get(api)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	err = json.NewDecoder(res2.Body).Decode(&locationsData)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	// Create a slice to store the extracted Locations
	var locations []entity.Locations

	// Iterate through locationsData.Index and extract the data
	for _, locationData := range locationsData.Index {
		locations = append(locations, entity.Locations{
			ID:        locationData.ID,
			Locations: locationData.Locations,
			Dates:     locationData.Dates,
		})
	}

	return locations
}
