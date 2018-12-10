package handler

import (
	"fmt"
	"log"
	"math/rand"
	"os"

	sendgrid "github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func EmailHtml(content string) string {
	html := `
		<div width="100%" style="background: #f8f8f8; padding: 0px 0px; font-family:arial; line-height:28px; height:100%;  width: 100%; color: #514d6a;">
			<div style="max-width: 700px; padding:50px 0;  margin: 0px auto; font-size: 14px">
				<div style="padding: 40px; background: #fff;">
					<table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
						` + content + `
					</table>
				</div>
				<div style="text-align: center; font-size: 12px; color: #b2b2b5; margin-top: 20px">
					<p> Powered by ADStation
						<br>
						<a href="javascript: void(0);" style="color: #b2b2b5; text-decoration: underline;">Unsubscribe</a> </p>
				</div>
			</div>
		</div>`
	return html
}

//RandStringBytes return random string
func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

//SendMail to someone using SendGrid
func SendMail(toEmail string, subjectTitle string, bodyEmail string) {

	from := mail.NewEmail("ADStation", "no-reply@adstation.io")
	subject := subjectTitle
	//just for resting
	//please replace the email from "" to toEmail
	to := mail.NewEmail("Usuario", toEmail)
	plainTextContent := bodyEmail
	htmlContent := bodyEmail
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)

	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
