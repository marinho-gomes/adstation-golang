package model

type(
	Snapshot struct {
		LikeNum int `bson:"likeNum"`
		CommentsNum int `bson:"commentsNum"`
		TakenOn string `bson:"takenOn"`
	}
)