package entity

type Locations struct {
    ID        int      `json:"id"`
    Locations []string `json:"locations"`
    Dates     string   `json:"dates"`
}