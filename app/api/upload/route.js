
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export async function POST(req) {
  console.log("POSTers2")
  const { fileName, fileData, email } = await req.json()
  console.log({ fileName, fileData, email })

  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  const command = new PutObjectCommand({
    Bucket: "files-compress",
    Key: fileName,
    Body: fileData,
    Tagging: `email=${email}`
  });

  try {
    const response = await client.send(command);
    console.log("success")
    console.log(response);
  } catch (err) {
    console.log("Error");
    console.error(err);
  }
  return new Response(JSON.stringify(fileData), { status: 200 })
}
