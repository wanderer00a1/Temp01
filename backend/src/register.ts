import { APIGatewayProxyHandler } from "aws-lambda";
import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const db = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (e) => {
  try {
    const body = JSON.parse(e.body || "{}");
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({ error: "All Fields are required!" }),
      };
    }

    if (password.length < 6) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({
          error: "Password must be at least 6 characters long",
        }),
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .put({
        TableName: "Users",
        Item: {
          id: uuidv4(),
          username,
          email,
          hashedPassword,
          createdAt: new Date().toISOString(),
        },
      })
      .promise();

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ message: "User registered successfully!" }),
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