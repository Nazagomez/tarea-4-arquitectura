import type { Track } from './track'

/**
 * Pinia state for the Spotify tracks collection and persisted favorites.
 */
export interface TracksState {
  tracks: Track[]
  currentTrack: Track | null
  favoriteNums: number[]
}
