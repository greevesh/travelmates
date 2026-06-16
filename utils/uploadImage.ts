// fixes crypto call err
import "react-native-get-random-values"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { s3ProfilePicsEndpoint, currentUserEndpoint } from '@/consts/api'
import { handleError } from './errorHandler'
import axios from "axios"
import { withAuthRetry } from "./auth"

const s3Client = new S3Client({
  region: 'ap-southeast-1',
  requestChecksumCalculation: 'WHEN_REQUIRED',
  credentials: {
    accessKeyId: `${process.env.EXPO_PUBLIC_S3_ACCESS_KEY_ID}`,  
    secretAccessKey: `${process.env.EXPO_PUBLIC_S3_SECRET_ACCESS_KEY}`,
  },
})

const uploadImageToS3 = async (fileUri: string): Promise<string> => {
  const key = fileUri.split('/').pop() // 'key' = path/object name inside the bucket
  if (!key) {
    throw new Error('Invalid file URI')
  }

  try {
    const res = await fetch(fileUri)
    const arrayBuffer = await res.arrayBuffer()
    const body = new Uint8Array(arrayBuffer)

    const command = new PutObjectCommand({
      Bucket: 'travelmates-profile-pics',
      Key: key,
      Body: body,
      ContentType: 'image/png',
    })

    await s3Client.send(command)
    return s3ProfilePicsEndpoint + key
  } catch (err) {
      handleError(err, 'Failed to upload file to S3')
      throw err
  }
}

const uploadImageToDb = async (pic: string) => {
  try {
    await withAuthRetry((headers) => axios.patch(
      currentUserEndpoint,
      { pic },
      { headers }
    ))
  }
  catch (err) {
    handleError(err, 'Failed to upload file to DB')
  }
} 

export { uploadImageToS3, uploadImageToDb }