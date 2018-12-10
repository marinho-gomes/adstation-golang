package handler

import (
	"fmt"
	"goapi/model"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo"
	"gopkg.in/mgo.v2/bson"
)

/*
//save a query from user in the database
//just started implementing it
func (h *Handler) SaveAdsQuery(c echo.Context) (err error) {

	// Database name and collection name
	// car-db is database name car is collation name
	db := h.DB.Clone()
	c := db.DB("adspy").C("saved_query")

	// Insert Datas
	err = c.Insert(&Person{Name: "Ale", Phone: "+55 53 1234 4321", Timestamp: time.Now()})

	if err != nil {
		panic(err)
	}
	return c.JSON(http.StatusOK, results)
}
*/

//GetAdRoute returns the information for one unique ad
func (h *Handler) GetAdRoute(c echo.Context) (err error) {

	fmt.Println(c.Param("id"))
	adID := c.Param("id")

	result := model.Ad{}
	db := h.DB.Clone()
	ads := db.DB("adspy").C("ad")

	defer db.Close()

	//q := ads.Find(bson.M{"country": "USA"}).Sort("name", "_id").Limit(10)
	err = ads.Find(bson.M{"id": adID}).One(&result)
	fmt.Println(result.Pages)

	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, result)
}

//ApiAdsRoute returns the information for all the ads in a search
func (h *Handler) ApiAdsRoute(c echo.Context) (err error) {

	perPage := 9

	created_start_date := c.QueryParam("created_start")
	created_end_date := c.QueryParam("created_end")
	seen_start_date := c.QueryParam("seen_start")
	seen_end_date := c.QueryParam("seen_end")

	//min_age := c.QueryParam("min_age")
	//max_age := c.QueryParam("max_age")

	keyword := c.QueryParam("keyword")
	sort := c.QueryParam("sort")

	const oldTimer = "02-Jan-2006"

	queryString := bson.M{}

	var sortBy = "-createdOn"

	//check if sort is being sent
	if len(sort) > 0 {
		switch os := sort; os {
		case "created_desc":
			sortBy = "-createdOn"
		case "created_asc":
			sortBy = "createdOn:1"
		case "likes_desc":
			sortBy = "-snapshot.likeNum"
		case "likes_asc":
			sortBy = "snapshot.likeNum:1"
		case "":

		}
	}

	//start the creation of the query bson.M{}
	//first we checked for the dates CreatedStartDate

	if len(created_start_date) > 0 {
		startDate, err := time.Parse(oldTimer, created_start_date)
		if err != nil {
			log.Fatal(err)
		}

		// {}
		createdQuery := bson.M{}
		//from start date
		// {"$gt": "2018-02-01"}

		createdQuery["$gte"] = startDate
		fmt.Println(createdQuery["$gte"])

		if len(created_end_date) > 0 {
			//t date
			endDate, err := time.Parse(oldTimer, created_end_date)
			if err != nil {
				log.Fatal(err)
			}
			// {"$gt": "2018-02-01","$lte":"2018-02-01"}
			createdQuery["$lte"] = endDate
		}
		// { "createdOn":{"$gte": "2018-02-01"} }
		// or
		// { "createdOn":{"$gte": "2018-02-01","$lte":"2018-02-01"} }
		queryString["createdOn"] = createdQuery
	}

	if len(created_end_date) > 0 && len(created_start_date) == 0 {
		endDate, err := time.Parse(oldTimer, created_end_date)
		if err != nil {
			log.Fatal(err)
		}
		// create a query string
		// {}
		createdQuery := bson.M{}
		//add information to query

		// {"$lte": "2018-02-01"}
		createdQuery["$lte"] = endDate

		// { "createdOn":{"$lte": "2018-02-01"} }
		queryString["createdOn"] = createdQuery
	}

	//now we check for the SeenStartDate
	if len(seen_start_date) > 0 {
		seenStartDate, err := time.Parse(oldTimer, created_end_date)
		if err != nil {
			log.Fatal(err)
		}

		seenQuery := bson.M{}
		//from start date
		// {"$gte": "2018-02-01"}
		seenQuery["$gte"] = seenStartDate

		if len(seen_end_date) > 0 {
			//t date
			seenEndDate, err := time.Parse(oldTimer, seen_end_date)
			if err != nil {
				log.Fatal(err)
			}

			// {"$gte": "2018-02-01","$gte": "2018-02-01"}
			seenQuery["$lte"] = seenEndDate
		}

		// { "snapshot.takenOn":{"$gte": "2018-02-01"} }
		// or
		// { "snapshot.takenOn":{"$gte": "2018-02-01"} }
		queryString["snapshot.takenOn"] = seenQuery
	}

	if len(seen_end_date) > 0 && len(seen_start_date) == 0 {
		seenEndDate, err := time.Parse(oldTimer, created_end_date)
		if err != nil {
			log.Fatal(err)
		}

		//create a query string
		seenQuery := bson.M{}
		//add information to query
		seenQuery["$lte"] = seenEndDate
	}

	urlStrings := c.QueryParams()
	sites := urlStrings["site"]
	//fmt.Println("urlString:")
	//fmt.Println(urlStrings)
	//returning all the landing pages we want to find

	//here we start the creation of the very complex structure of
	if len(sites) > 0 {

		var orTemplate []interface{}

		if len(sites) > 1 {

			for _, site := range sites {

				//joining regex keywords
				orTemplate = append(orTemplate, bson.M{"pages.outgoingLinks.url": bson.M{"$regex": bson.RegEx{site, ""}}})
				orTemplate = append(orTemplate, bson.M{"pages.finalUrl": bson.M{"$regex": bson.RegEx{site, ""}}})
				orTemplate = append(orTemplate, bson.M{"pages.redirectUrls": bson.M{"$regex": bson.RegEx{site, ""}}})

			}

		} else {

			orTemplate = append(orTemplate, bson.M{"pages.outgoingLinks.url": bson.M{"$regex": bson.RegEx{sites[0], ""}}})
			orTemplate = append(orTemplate, bson.M{"pages.finalUrl": bson.M{"$regex": bson.RegEx{sites[0], ""}}})
			orTemplate = append(orTemplate, bson.M{"pages.redirectUrls": bson.M{"$regex": bson.RegEx{sites[0], ""}}})

		}

		queryString["$or"] = orTemplate

	}

	if len(keyword) > 0 {
		// {"$text":{"$search": keyword}}
		queryString["$text"] = bson.M{"$search": keyword}
	}

	//get page from url
	page := c.QueryParam("page")

	//fmt.Println("Page:")
	//fmt.Println(page)
	//convert page from string to integer
	pg, err := strconv.Atoi(page)
	if err != nil {
		log.Fatal(err)
	}

	results := make([]model.Ad, 0, perPage)

	// Database name and collection name
	// car-db is database name car is collation name
	db := h.DB.Clone()
	ads := db.DB("adspy").C("ad")

	defer db.Close()

	//fmt.Println(queryString)

	//q := ads.Find(bson.M{"country": "USA"}).Sort("name", "_id").Limit(10)
	//fmt.Println(sortBy)
	q := ads.Find(queryString).Select(bson.M{"id": 1, "adType": 1, "minAge": 1, "genderStats": 1, "actor": 1, "text": 1, "countryStats": 1, "attachments": 1, "privacyScope": 1, "maxAge": 1, "createdOn": 1, "isIg": 1, "ageStats": 1, "countries": 1, "genders": 1, "comments": 1, "snapshot": 1, "mainAttachment": 1, "linkToAd": 1}).Sort(sortBy).Limit(perPage)
	//fmt.Println(q)
	q = q.Skip((pg - 1) * perPage)
	err = q.All(&results)
	if err != nil {
		log.Fatal(err)
	}

	return c.JSON(http.StatusOK, results)

}
