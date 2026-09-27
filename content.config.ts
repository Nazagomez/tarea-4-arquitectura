import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    tracks: defineCollection({
      type: 'data',
      source: 'top50-spotify-2019.csv',
      schema: z.object({
        num: z.number(),
        name: z.string(),
        artist: z.string(),
        genre: z.string(),
        bpm: z.number(),
        energy: z.number(),
        danceability: z.number(),
        loudness: z.number(),
        liveness: z.number(),
        valence: z.number(),
        length: z.number(),
        acousticness: z.number(),
        speechiness: z.number(),
        popularity: z.number()
      })
    })
  }
})
