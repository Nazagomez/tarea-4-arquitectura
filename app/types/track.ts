/**
 * Spotify track record taken from the Kaggle Top 50 2019 CSV.
 */
export interface Track {
  readonly num: number
  readonly name: string
  readonly artist: string
  readonly genre: string
  readonly bpm: number
  readonly energy: number
  readonly danceability: number
  readonly loudness: number
  readonly liveness: number
  readonly valence: number
  readonly length: number
  readonly acousticness: number
  readonly speechiness: number
  readonly popularity: number
}
