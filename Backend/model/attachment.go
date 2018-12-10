package model

type (
	Attachment struct {
		TypeAttach            string `bson:"type"`
		IsSubAttachment       bool   `bson:"isSubAttachment"`
		AttachmentTitle       string `bson:"attachmentTitle"`
		AttachmentSource      string `bson:"attachmentSource"`
		ImageURL              string `bson:"imageUrl"`
		VideoURL              string `bson:"videoUrl"`
		State                 string `bson:"state"`
		ActionLinkTitle       string `bson:"actionLinkTitle"`
		ActionLinkLinkDisplay string `bson:"actionLinkLinkDisplay"`
		Width                 string `bson:"width"`
		Height                string `bson:"height"`
	}
)
