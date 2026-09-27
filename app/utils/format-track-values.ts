import { AVERAGE_DECIMALS, EMPTY_AVERAGE, SECONDS_PER_MINUTE } from './track-constants'

/**
 * Formats a decimal average using a fixed number of digits.
 */
export function formatTrackAverage(value: number): string {
  if (!Number.isFinite(value)) {
    return EMPTY_AVERAGE.toFixed(AVERAGE_DECIMALS)
  }
  return value.toFixed(AVERAGE_DECIMALS)
}

/**
 * Formats a track duration stored in seconds as m:ss.
 */
export function formatTrackLength(lengthInSeconds: number): string {
  const minutes = Math.floor(lengthInSeconds / SECONDS_PER_MINUTE)
  const seconds = lengthInSeconds % SECONDS_PER_MINUTE
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

/**
 * Formats a loudness value in decibels.
 */
export function formatTrackLoudness(loudness: number): string {
  return `${loudness} dB`
}
