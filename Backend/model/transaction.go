package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

type (
	Transaction struct {
		ID                  bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Email               string        `json:"email" bson:"email"`
		CustomerID          string        `json:"customer_id" bson:"customerId"`
		UserID              bson.ObjectId `json:"user_id" bson:"userId"`
		StripeTransactionID string        `json:"stripe_transaction_id" bson:"stripeTransactionId"`
		CreatedAt           time.Time     `json:"created_date" bson:"createdAt"`
		UpdatedAt           time.Time     `json:"updated_date" bson:"updatedAt"`
		Status              string        `json:"status"`
	}
)
