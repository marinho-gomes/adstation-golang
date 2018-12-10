package model

type(
	Stat struct {
		Key string `bson:"key"`
		Count int `bson:"count"`
	}
)