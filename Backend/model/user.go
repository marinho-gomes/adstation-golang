package model

import (
	"gopkg.in/mgo.v2/bson"
)

type (
	User struct {
		ID          bson.ObjectId `json:"id" bson:"_id,omitempty"`
		Email       string        `json:"email" bson:"email" form:"email"`
		Password    string        `json:"password,omitempty" bson:"password" form:"password"`
		Token       string        `json:"token,omitempty" bson:"-"`
		MonetizzeID string        `json:"stripe_id"`
		Active      int           `json:"active"`
		Subscribed  bool          `json:"subscribed" bson:"subscribed"`
	}
)
