package model

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

//Ad this an structure for the ad
type (
	Ad struct {
		ID           bson.ObjectId `bson:"_id,omitempty"`
		Actor        Actor         `bson:"actor"`
		AID          string        `bson:"id"`
		IsIg         bool          `bson:"isIg"`
		Text         string        `bson:"text"`
		CreatedOn    time.Time     `bson:"createdOn"`
		PrivacyScope string        `bson:"privacyScope"`
		MinAge       int           `bson:"minAge"`
		MaxAge       int           `bson:"maxAge"`
		Countries    []string      `bson:"countries"`
		Genders      []string      `bson:"genders"`
		Snapshot     Snapshot      `bson:"snapshot"`
		Pages        []Pages       `bson:"pages"`

		Attachments    []Attachment `bson:"attachments"`
		SubAttachments []Attachment `bson:"subAttachments"`
		MainAttachment Attachment   `bson:"mainAttachment"`
		Comments       []string     `bson:"comments"`
		AdType         string       `bson:"adType"`
		LinkToAd       string       `bson:"linkToAd"`
	}
)
