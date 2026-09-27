import { defineStore } from 'pinia'
import type { Track } from '../types/track'
import type { TracksState } from '../types/tracks-state'
import { AVERAGE_DECIMALS, EMPTY_AVERAGE } from '../utils/track-constants'
import { mapContentTrack } from '../utils/map-content-track'

/**
 * Loads the Spotify CSV collection and keeps the favorites list.
 */
export const useTracksStore = defineStore('tracks', {
  state: (): TracksState => ({
    tracks: [],
    currentTrack: null,
    favoriteNums: []
  }),
  getters: {
    /**
     * Calculates the average popularity of the loaded tracks.
     */
    averagePopularity(state): number {
      if (state.tracks.length === 0) {
        return EMPTY_AVERAGE
      }
      const totalPopularity = state.tracks.reduce((sum, track) => sum + track.popularity, 0)
      const rawAverage = totalPopularity / state.tracks.length
      return Number(rawAverage.toFixed(AVERAGE_DECIMALS))
    },
    /**
     * Returns the persisted favorite tracks using the loaded list.
     */
    favoriteTracks(state): Track[] {
      return state.tracks.filter((track) => state.favoriteNums.includes(track.num))
    },
    /**
     * Returns the previous track in the ranked list.
     */
    previousTrack(state): Track | null {
      if (!state.currentTrack) {
        return null
      }
      const currentIndex = state.tracks.findIndex((track) => track.num === state.currentTrack?.num)
      return currentIndex > 0 ? state.tracks[currentIndex - 1] : null
    },
    /**
     * Returns the next track in the ranked list.
     */
    nextTrack(state): Track | null {
      if (!state.currentTrack) {
        return null
      }
      const currentIndex = state.tracks.findIndex((track) => track.num === state.currentTrack?.num)
      const nextIndex = currentIndex + 1
      return currentIndex >= 0 && nextIndex < state.tracks.length ? state.tracks[nextIndex] : null
    },
    /**
     * Checks whether a track is in the favorites list.
     */
    hasFavorite(state): (num: number) => boolean {
      return (num: number): boolean => state.favoriteNums.includes(num)
    }
  },
  actions: {
    /**
     * Loads the full ranked list from the Nuxt Content data collection.
     */
    async loadTracks(): Promise<Track[]> {
      if (this.tracks.length > 0) {
        return this.tracks
      }
      const documents = await queryCollection('tracks').order('num', 'ASC').all()
      this.tracks = documents.map((document) => mapContentTrack(document as Track))
      return this.tracks
    },
    /**
     * Loads a single track by its identifier column.
     */
    async loadTrack(num: number): Promise<Track | null> {
      const document = await queryCollection('tracks').where('num', '=', num).first()
      this.currentTrack = document ? mapContentTrack(document as Track) : null
      return this.currentTrack
    },
    /**
     * Adds or removes a track from the persisted favorites list.
     */
    executeToggleFavorite(num: number): void {
      if (this.favoriteNums.includes(num)) {
        this.favoriteNums = this.favoriteNums.filter((favoriteNum) => favoriteNum !== num)
        return
      }
      this.favoriteNums = [...this.favoriteNums, num]
    }
  },
  persist: {
    pick: ['favoriteNums']
  }
})
