import { UploadApiResponse, v2 as _cloudinary } from 'cloudinary'

export const cloudinary = () => {
  const config = useRuntimeConfig()
  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })

  return _cloudinary
}

export const uploadToCloudinary = (
  image: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (err, data) => {
      if (err) return reject(err)
      resolve(data!)
    })
  })
}
