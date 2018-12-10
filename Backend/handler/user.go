package handler

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"goapi/model"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type (
	CheckResult struct {
		ID    string
		Valid bool
	}
	TokenResult struct {
		Email      string `bson:"email"`
		ResetToken string `bson:"reset_token"`
	}
	EmailReq struct {
		Email string `bson:"email" form:"email" json:"email"`
	}
)

//GetUserID ...
func (h *Handler) CheckTokenID(c echo.Context) (err error) {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userID := claims["id"].(string)

	db := h.DB.Clone()
	defer db.Close()

	users := db.DB("adspy").C("users")

	fmt.Println(userID)
	qty, err := users.Find(bson.M{"_id": bson.ObjectIdHex(userID), "subscribed": true}).Count()
	fmt.Println("Found " + strconv.Itoa(qty))

	resultCheck := &CheckResult{
		ID:    userID,
		Valid: false,
	}

	if qty > 0 {
		resultCheck.Valid = true
	}

	return c.JSON(http.StatusOK, resultCheck)
}

func (h *Handler) Signup(c echo.Context) (err error) {
	// Bind
	u := &model.User{ID: bson.NewObjectId()}
	if err = c.Bind(u); err != nil {
		return
	}

	// Validate
	if u.Email == "" || u.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}

	// Save user
	db := h.DB.Clone()
	defer db.Close()
	if err = db.DB("adspy").C("users").Insert(u); err != nil {
		return
	}

	return c.JSON(http.StatusCreated, u)
}

func (h *Handler) SendResetPass(c echo.Context) (err error) {
	token := c.QueryParam("token")

	// Find user
	findUser := bson.M{"reset_token": token}
	db := h.DB.Clone()

	defer db.Close()

	resultToken := new(TokenResult)

	if err = db.DB("adspy").C("password_resets").Find(findUser).One(resultToken); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "invalid token"}
		}
		return
	}

	newPassword := RandStringBytes(13)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), 10)

	usr := db.DB("adspy").C("password_resets")
	change := mgo.Change{
		Update:    bson.M{"password": hashedPassword},
		ReturnNew: false,
	}

	newUser := new(model.User)
	usr.Find(bson.M{"email": resultToken.Email}).Apply(change, &newUser)

	passHtml := `<tbody>
	<tr>
		<td><b>Caro usuário,</b>
			<p>A sua senha foi resetada de acordo com seu pedido. Aqui vão os seus novos dados de acesso:</p>
			<p>Email: ` + resultToken.Email + `</p>
			<p>Senha: ` + newPassword + `</p>
			<a href="http://app.adstation.io" style="display: inline-block; padding: 11px 30px; margin: 20px 0px 30px; font-size: 15px; color: #fff; background: #4fc3f7; border-radius: 60px; text-decoration:none;"> Acesse ADStation agora </a>
			<p>This email template can be used for Create Account, Change Password, Login Information and other informational things.</p>
			<b>- Obrigado (Time ADStation)</b> </td>
	</tr>
</tbody>`

	sendBody := EmailHtml(passHtml)

	SendMail(resultToken.Email, "Sua nova senha ADStation", sendBody)

	return c.JSON(http.StatusOK, token)
}

func (h *Handler) PassReset(c echo.Context) (err error) {

	reqInfo := new(EmailReq)
	if err = c.Bind(reqInfo); err != nil {
		return
	}

	email := reqInfo.Email

	// Find user
	findUser := bson.M{"email": email}
	db := h.DB.Clone()

	defer db.Close()

	fmt.Println(findUser)
	dbUser := new(model.User)
	if err = db.DB("adspy").C("users").Find(findUser).One(dbUser); err != nil {
		if err == mgo.ErrNotFound {
			return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "invalid email"}
		}
		return
	}

	//generate random string for confirmation
	codigoReset := RandStringBytes(20)
	currentTime := time.Now()

	prDb := db.DB("adspy").C("password_resets")

	// Insert password_reset to the database
	err = prDb.Insert(bson.M{"email": email, "reset_token": codigoReset, "created_at": currentTime})
	if err != nil {
		panic(err)
	}

	resetBody := `<tbody>
	<tr>
		<td style="border-bottom:1px solid #f6f6f6;">
			<h1 style="font-size:14px; font-family:arial; margin:0px; font-weight:bold;">Caro cliente,</h1>
			<p style="margin-top:0px; color:#bbbbbb;">Aqui vão as instruções para resetar sua senha.</p>
		</td>
	</tr>
	<tr>
		<td style="padding:10px 0 30px 0;">
			<p>Um pedido para resetar sua senha foi feito. Se você não fez esse pedido, simplismente ignore esse e-mail. Se você fez esse pedido, resete sua senha:</p>
			<center>
				<a href="http://app.adstation.io/app/resetconfirm?token=` + codigoReset + `" style="display: inline-block; padding: 11px 30px; margin: 20px 0px 30px; font-size: 15px; color: #fff; background: #4fc3f7; border-radius: 60px; text-decoration:none;">Resetar Senha</a>
			</center>
			<b>- Obrigado (Time ADStation)</b> </td>
	</tr>
	<tr>
		<td style="border-top:1px solid #f6f6f6; padding-top:20px; color:#777">Se o butão acima não funcionar, tente copiar e colocar o LINK abaixo no seu navegador.<br>http://app.adstation.io/#/reset_password?id=` + codigoReset + `  <br>Se você continuar a ter problemas por-favor entrar em contato com contato@adstation.io</td>
	</tr>
</tbody>`

	html := EmailHtml(resetBody)

	//send email using SendGrid
	SendMail(email, "Pedido para resetar sua senha", html)

	return c.JSON(http.StatusOK, email)
}

func (h *Handler) Login(c echo.Context) (err error) {
	// Bind
	u := new(model.User)
	if err = c.Bind(u); err != nil {
		return
	}

	// Find user
	findUser := bson.M{"email": u.Email}
	db := h.DB.Clone()

	defer db.Close()

	fmt.Println("Connecting to DB")

	dbUser := new(model.User)
	if err = db.DB("adspy").C("users").Find(findUser).One(dbUser); err != nil {
		if err == mgo.ErrNotFound {
			fmt.Println("Invalid email")
			return &echo.HTTPError{Code: http.StatusUnauthorized, Message: "invalid email or password"}
		}
		return
	}

	if err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(u.Password)); err != nil {
		fmt.Println("Compare hash password")
		// If the two passwords don't match, return a 401 status
		return c.JSON(http.StatusUnauthorized, u)

	}

	//-----
	// JWT
	//-----

	// Create token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["trial"] = false
	claims["id"] = dbUser.ID
	claims["exp"] = time.Now().Add(time.Hour * 48).Unix()

	// Generate encoded token and send it as response
	dbUser.Token, err = token.SignedString([]byte(Key))
	if err != nil {
		return err
	}

	dbUser.Password = "" // Don't send password

	fmt.Println("Got to password long later")
	return c.JSON(200, dbUser)
}

func userIDFromToken(c echo.Context) string {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	return claims["id"].(string)
}
