import json
import boto3

dynamodb = boto3.resource('dynamodb').Table('YOUR-USER-TABLE')


def lambda_handler(event, context):
    print(event)
    attributes = event["request"]["userAttributes"]

    dynamodb.put_item(Item={
        "id": attributes["sub"],
        "email": attributes["email"],
        "phone_number": attributes["phone_number"],
        "username": event["userName"]
    })

    # Return to Amazon Cognito
    return event
