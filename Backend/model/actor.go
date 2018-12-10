package model

type (
	Actor struct {
		ID             string `bson:"id"`
		Name           string `bson:"name"`
		ProfilePicture string `bson:"profilePicture"`
	}
)
