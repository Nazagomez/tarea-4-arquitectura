<script setup lang="ts">
const route = useRoute()
const tracksStore = useTracksStore()
const trackNumber = Number(route.params.num)

if (!Number.isInteger(trackNumber) || trackNumber < 1) {
  throw createError({ statusCode: 404, statusMessage: 'Canción no encontrada' })
}

await useAsyncData(`track-${trackNumber}`, async () => {
  await tracksStore.loadTracks()
  return tracksStore.loadTrack(trackNumber)
})

if (!tracksStore.currentTrack) {
  throw createError({ statusCode: 404, statusMessage: 'Canción no encontrada' })
}

const { currentTrack, previousTrack, nextTrack } = storeToRefs(tracksStore)

function executeToggleFavorite(): void {
  if (!currentTrack.value) {
    return
  }
  tracksStore.executeToggleFavorite(currentTrack.value.num)
}

useSeoMeta({
  title: `${tracksStore.currentTrack.name} | Top 50 Spotify 2019`,
  description: `${tracksStore.currentTrack.name} de ${tracksStore.currentTrack.artist}, puesto ${tracksStore.currentTrack.num} del ranking 2019.`
})
</script>

<template>
  <div v-if="currentTrack" class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/tracks">Canciones</NuxtLink> /
      {{ currentTrack.name }}
    </p>
    <div class="row">
      <div class="twelve columns">
        <h4>{{ currentTrack.name }}</h4>
        <p>
          por {{ currentTrack.artist }} — Género: {{ currentTrack.genre }} —
          Popularidad: {{ currentTrack.popularity }}
        </p>
        <button class="button button-primary" type="button" @click="executeToggleFavorite">
          {{ tracksStore.hasFavorite(currentTrack.num) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
        </button>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Puesto</span>
            {{ currentTrack.num }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Artista</span>
            {{ currentTrack.artist }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Género</span>
            {{ currentTrack.genre }}
          </div>
        </div>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Popularidad</span>
            {{ currentTrack.popularity }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">BPM</span>
            {{ currentTrack.bpm }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Duración</span>
            {{ formatTrackLength(currentTrack.length) }}
          </div>
        </div>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Energía</span>
            {{ currentTrack.energy }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Bailabilidad</span>
            {{ currentTrack.danceability }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Valence</span>
            {{ currentTrack.valence }}
          </div>
        </div>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Loudness</span>
            {{ formatTrackLoudness(currentTrack.loudness) }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Liveness</span>
            {{ currentTrack.liveness }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Acousticness</span>
            {{ currentTrack.acousticness }}
          </div>
        </div>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Speechiness</span>
            {{ currentTrack.speechiness }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Length (s)</span>
            {{ currentTrack.length }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Identificador</span>
            {{ currentTrack.num }}
          </div>
        </div>
        <div class="row neighbor-nav">
          <div class="six columns">
            <NuxtLink v-if="previousTrack" :to="`/tracks/${previousTrack.num}`">
              ← {{ previousTrack.name }}
            </NuxtLink>
          </div>
          <div class="six columns" style="text-align: right">
            <NuxtLink v-if="nextTrack" :to="`/tracks/${nextTrack.num}`">
              {{ nextTrack.name }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <FooterView />
  </div>
</template>
