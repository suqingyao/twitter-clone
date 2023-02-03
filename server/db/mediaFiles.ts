import { prisma } from '.'

export type MediaFileDto = {
  userId: string
  url: string
  tweetId: string
}

export const createMediaFile = <T extends MediaFileDto>(mediaFile: T) => {
  return prisma.mediaFile.create({
    data: mediaFile
  })
}
