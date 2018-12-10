package model

type (
	Assinatura struct {
		Codigo         string `bson:"codigo"`
		Status         string `bson:"status"`
		DataAssinatura string `bson:"data_assinatura"`
		Parcela        string `bson:"parcela"`
	}
)
