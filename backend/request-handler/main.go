package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var greeting string

	greeting = "Hello, world!\n"

	value := request.Body
	println(value)

	// CORSを許可するヘッダーを設定
	headers := map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
		"Access-Control-Allow-Headers": "Content-Type,Authorization",
	}

	return events.APIGatewayProxyResponse{
		Body:       greeting,
		StatusCode: 200,
		Headers:    headers,
	}, nil
}

func main() {
	lambda.Start(handler)
}
