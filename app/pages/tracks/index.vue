<script setup lang="ts">
import { ALL_GENRES_VALUE } from '../../utils/track-constants'

const tracksStore = useTracksStore()
await useAsyncData('tracks-list', () => tracksStore.loadTracks())
const { tracks, averagePopularity } = storeToRefs(tracksStore)
const selectedGenre = ref<string>(ALL_GENRES_VALUE)

const availableGenres = computed(() => {
  const genres = tracks.value.map((track) => track.genre)
  return [...new Set(genres)].sort((left, right) => left.localeCompare(right))
})

const visibleTracks = computed(() => {
  if (selectedGenre.value === ALL_GENRES_VALUE) {
    return tracks.value
  }
  return tracks.value.filter((track) => track.genre === selectedGenre.value)
})

useSeoMeta({
  title: 'Canciones | Top 50 Spotify 2019',
  description: 'Listado completo del dataset Top 50 Spotify 2019 con el promedio de popularidad.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Canciones
    </p>
    <h3 style="margin-top: 15px">Spotify Top 50 — 2019</h3>
    <p>
      Dataset de las 50 canciones más escuchadas en Spotify durante 2019.
      Los datos se obtienen desde el store de Pinia.
    </p>
    <div class="stat-box average-box">
      <span class="fact-label">Promedio de popularidad</span>
      <strong>{{ formatTrackAverage(averagePopularity) }}</strong>
      calculado con un getter del store sobre el campo numérico <code>popularity</code>.
    </div>
    <label for="genre-filter">Filtrar por género</label>
    <select id="genre-filter" v-model="selectedGenre">
      <option :value="ALL_GENRES_VALUE">Todos los géneros</option>
      <option v-for="genre in availableGenres" :key="genre" :value="genre">
        {{ genre }}
      </option>
    </select>
    <ul class="book-list">
      <TrackListItem v-for="track in visibleTracks" :key="track.num" :track="track" />
    </ul>
    <FooterView />
  </div>
</template>
