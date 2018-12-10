package model

type (
	Venda struct {
		Cupom            string `bson:"cupom"`
		DataInicio       string `bson:"dataInicio"`
		DataFinalizada   string `bson:"dataFinalizada"`
		MeioPagamento    string `bson:"meio_pagamento"`
		FormaPagamento   string `bson:"forma_pagamento"`
		GarantiaRestante string `bson:"garantia_restante"`
		Status           string `bson:"status"`
		Valor            string `bson:"valor"`
		Quantidade       string `bson:"quantidade"`
		ValorRecebido    string `bson:"valorRecebido"`
	}
)
