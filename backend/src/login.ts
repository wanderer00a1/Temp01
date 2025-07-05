import { APIGatewayProxyHandler } from "aws-lambda";
import AWS from "aws-sdk";
import bcrypt from "bcryptjs";

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (e) => {
  try {
    const body = JSON.parse(e.body || "{}");
    const { email, password } = body;

    if (!email || !password) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ error: "Email and password are required!" }),
      };
    }

    const result = await db
      .query({
        TableName: "Users",
        IndexName: "EmailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      })
      .promise();

    if (!result.Items || result.Items.length === 0) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ error: "Invalid email or password" }),
      };
    }

    const user = result.Items[0];
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isValidPassword) {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ error: "Invalid email or password" }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        message: "Login successful!",
        userId: user.id,
        username: user.username,
      }),
    };
  } catch (error: any) {
    console.error("Lambda error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message || "Unknown error",
      }),
    };
  }
};
