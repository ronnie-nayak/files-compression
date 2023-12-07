
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";


export async function POST(req) {
  const { username, password } = await req.json()

  const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  const docClient = DynamoDBDocumentClient.from(client);

  const command = new PutCommand({
    TableName: "authDynamo",
    Item: {
      compressRon: username,
      password: password
    },
  });

  const response = await docClient.send(command);
  console.log(response);

  return new Response(JSON.stringify(response), { status: 200 })
}
