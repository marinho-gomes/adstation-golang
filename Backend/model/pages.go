package model

type Pages struct {
	FinalURL       string      `bson:"finalUrl"`
	ScreenFileName string      `bson:"screenFileName"`
	TechStack      []TechStack `bson:"techstack"`
	RedirectUrls   []string    `bson:"redirectUrls"`
	OutgoingLinks  []Link      `bson:"outgoingLinks"`
}
