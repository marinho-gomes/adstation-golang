package model

type(
	TechStack struct {
		Type string `bson:"type"`
		Tech []string `bson:"tech"`
	}
)
