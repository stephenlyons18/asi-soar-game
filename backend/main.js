const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify({ "message": "success" }),
    };

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            student_id: event.student_id,
        },
    };

    const entry = {
        TableName: process.env.TABLE_NAME,
        Item: event,
    };

    return dynamoDb.get(params).promise().then((res) => {
        if (Object.keys(res).length != 0) {
            if (event.score > res.Item.score) {
                return dynamoDb.put(entry).promise().then((res) => {
                    return response;
                });
            }
            return response;
        } else {
            return dynamoDb.put(entry).promise().then((res) => {
                return response;
            });
        }
    });
};
