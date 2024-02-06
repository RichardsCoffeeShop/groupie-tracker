package repository

import (
	"encoding/json"
	"fmt"
	"net/http"

	"groupie/entity"
)

func GetDatesData(api string) []entity.Dates {
	var DatesData entity.DatesData
	res2, err := http.Get(api)

	if err != nil {
		fmt.Println(err)
		return nil
	}

	err = json.NewDecoder(res2.Body).Decode(&DatesData)
	if err != nil {
		fmt.Println(err)
		return nil
	}

	var dates []entity.Dates
	for _, dateData := range DatesData.Index {
		dates = append(dates, entity.Dates{
			ID:    dateData.ID,
			Dates: dateData.Dates,
		})
	}
	return dates

}
