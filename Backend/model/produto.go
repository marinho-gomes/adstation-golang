package model

type (
	Product struct {
		Codigo string `bson:"codigo"`
		Nome   string `bson:"nome"`
		Chave  string `bson:"chave"`
	}
)
