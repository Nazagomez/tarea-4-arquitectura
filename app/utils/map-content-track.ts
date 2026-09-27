import type { Track } from '../types/track'

/**
 * Maps a Nuxt Content document to the Track contract used by the store.
 */
export function mapContentTrack(document: Track): Track {
  return {
    num: document.num,
    name: document.name,
    artist: document.artist,
    genre: document.genre,
    bpm: document.bpm,
    energy: document.energy,
    danceability: document.danceability,
    loudness: document.loudness,
    liveness: document.liveness,
    valence: document.valence,
    length: document.length,
    acousticness: document.acousticness,
    speechiness: document.speechiness,
    popularity: document.popularity
  }
}
