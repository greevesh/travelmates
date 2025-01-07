// fixes crypto call err
import "react-native-get-random-values"
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: `${process.env.EXPO_PUBLIC_S3_ACCESS_KEY_ID}`,  
    secretAccessKey: `${process.env.EXPO_PUBLIC_S3_SECRET_ACCESS_KEY}`,
  },
})

const uploadImageToS3 = async (fileUri: string) => {
  try {
    const response = await fetch(fileUri)
    const fileBlob = await response.blob()

    const params = {
      Bucket: 'travelmates-profile-pics',
      Key: fileUri.split('/').pop(),
      Body: fileBlob,          
      ContentType: 'image/png',
    }

    const command = new PutObjectCommand(params)
    const data = await s3Client.send(command)

    console.log('Success: ', data)
  } catch (err) {
    console.error('Error uploading file:', err)
  }
}

export default uploadImageToS3