package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/oklog/ulid"
	"math/rand"
	"time"
)

type Item struct {
	ULID      string `dynamodbav:"ulID"`
	Status    string `dynamodbav:"status"`
	OrderText string `dynamodbav:"OrderText"`
}

var (
	// DbEndpoint 接続先
	DbEndpoint = "http://dynamodb:8000"
)

// RequestBody の構造体
type RequestBody struct {
	OrderText string `json:"order_text"`
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var req RequestBody

	t := time.Now().UTC()
	entropy := ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0)
	id := ulid.MustNew(ulid.Timestamp(t), entropy)

	fmt.Println(request.Body)
	err := json.Unmarshal([]byte(request.Body), &req)
	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}
	fmt.Println("ジェネレート", id.String())

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}

	svc := dynamodb.NewFromConfig(cfg, func(o *dynamodb.Options) {
		o.EndpointResolver = dynamodb.EndpointResolverFromURL("http://localhost:8000")
	})
	item := Item{
		ULID:      id.String(),
		Status:    "Synthesizing",
		OrderText: req.OrderText,
	}
	av, err := attributevalue.MarshalMap(item)
	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String("SynthVoiceRequests"),
	}
	fmt.Println("しっぱい")
	_, err = svc.PutItem(context.TODO(), input)

	if err != nil {
		fmt.Println(err)
		return events.APIGatewayProxyResponse{}, err
	}
	// CORSを許可するヘッダーを設定
	headers := map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
		"Access-Control-Allow-Headers": "Content-Type,Authorization",
	}

	return events.APIGatewayProxyResponse{
		Body:       "test",
		StatusCode: 200,
		Headers:    headers,
	}, nil
}

func main() {
	lambda.Start(handler)
}
