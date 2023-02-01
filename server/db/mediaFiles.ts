import { prisma } from '.'

export type MediaFileDto = {
  userId: string
  url: string
  tweetId: string
}

export const createMediaFile = (mediaFile: MediaFileDto) => {
  return prisma.mediaFile.create({
    data: mediaFile
  })
}
