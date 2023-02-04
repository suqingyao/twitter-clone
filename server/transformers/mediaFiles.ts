import { MediaFile } from '@prisma/client'

export const mediaFilesTransformer = (mediaFile: MediaFile) => {
  return {
    id: mediaFile.id,
    url: mediaFile.url
  }
}
