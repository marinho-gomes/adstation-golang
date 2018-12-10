package handler

import (
	"gopkg.in/mgo.v2"
)

type (
	// Handler - Handle with DB connection
	Handler struct {
		DB *mgo.Session
	}
)

const (
	// Key (Should come from somewhere else).
	Key = "mj5MX9rQEdmRwhqE3w0d47tPN0VeAgf1"
)
