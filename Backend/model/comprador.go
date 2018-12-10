package model

type (
	Produto struct {
		Nome           string `bson:"nome"`
		Chave          string `bson:"chave"`
		Email          string `bson:"email"`
		DataNascimento string `bson:"data_nascimento"`
		CpfCnpj        string `bson:"cnpj_cpf"`
		Telefone       string `bson:"telefone"`
		CEP            string `bson:"cep"`
		Endereco       string `bson:"endereco"`
		Numero         string `bson:"numero"`
		Complemento    string `bson:"complement"`
		Bairro         string `bson:"bairro"`
		Cidade         string `bson:"cidade"`
		Estado         string `bson:"estado"`
		Pais           string `bson:"pais"`
	}
)
