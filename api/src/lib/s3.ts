import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getEnv} from "@/lib/env";

const s3 = new S3Client({
  region: getEnv("AWS_REGION"),
  credentials: {
    accessKeyId: getEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: getEnv("AWS_SECRET_ACCESS_KEY"),
  },
});

export async function getObject({key}: {key: string}) {
  return s3.send(
    new GetObjectCommand({
      Bucket: getEnv("AWS_BUCKET_NAME"),
      Key: `configurations/${key}`,
    }),
  );
}
