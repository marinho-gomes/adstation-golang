package main

import (
	"goapi/handler"
	"net/http"
	"os"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/labstack/gommon/log"
	"google.golang.org/appengine"
	"gopkg.in/mgo.v2"
)

func main() {

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//another setting for cors too
	e.Logger.SetLevel(log.ERROR)
	//e.Use(middleware.Logger())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		//AllowOrigins: []string{"http://35.198.13.228", "http://localhost", "http://localhost:80", "http://localhost:8080", "http://localhost:8081", "http://localhost:8082", "http://app.adstation.io", "https://app.adstation.io"},
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"authorization", "Content-Type"},
		AllowCredentials: true,
		AllowMethods:     []string{echo.OPTIONS, echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	//
	db, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		e.Logger.Fatal(err)
	}

	// Create indices
	if err = db.Copy().DB("adspy").C("users").EnsureIndex(
		mgo.Index{
			Key:    []string{"email"},
			Unique: true,
		}); err != nil {
		log.Fatal(err)
	}

	// Initialize handler
	h := &handler.Handler{DB: db}

	// Routes
	e.POST("/signup", h.Signup)
	e.POST("/auth/login", h.Login)
	e.POST("/auth/reset", h.PassReset)

	//authentication group Routes
	g := e.Group("/api")
	g.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningMethod: "HS256",
		SigningKey:    []byte(handler.Key),
	}))

	//g.GET("/getid", h.GetUserID)
	g.GET("/checkuser", h.CheckTokenID)
	g.GET("/ads", h.ApiAdsRoute)
	g.GET("/ad/:id", h.GetAdRoute)

	// Start server
	http.Handle("/", e)
	appengine.Main()
}
